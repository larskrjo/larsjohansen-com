import os
import threading
import time
from typing import Tuple

import requests

import app.constants.constants as constants
import app.db.db as db
from app.constants.secrets import SECRETS_FROM_AWS
from app.network.session import session_with_retry

MediaRecord = Tuple[str, str, str, str]

class InstagramWorker:

    @staticmethod
    def _get_instagram_id():
        with db.Database() as cur:
            cur.execute("""
                SELECT ig_user_id FROM instagram_credentials LIMIT 1
            """)
            rows = cur.fetchall()
        return rows[0][0]

    @staticmethod
    def _get_access_token():
        with db.Database() as cur:
            cur.execute("""
                SELECT access_token FROM instagram_credentials LIMIT 1
            """)
            rows = cur.fetchall()
        return rows[0][0]

    @staticmethod
    def _parse_payload(result: list[dict]) -> list[MediaRecord]:
        returned_list = []
        for item in result:
            if item.get('media_type') == "IMAGE":
                returned_list.append((item.get('id'), item.get('caption'), item.get('media_url'), item.get('timestamp')))
        return returned_list

    @staticmethod
    def _get_all_instagram_media(after: str | None = None) -> list[MediaRecord]:
        params = {
            "fields": "id,caption,media_type,media_url,timestamp",
            "access_token": InstagramWorker._get_access_token(),
            "limit": 25,
        }
        if after:
            params["after"] = after

        with session_with_retry() as session:
            r = session.get(f"https://graph.facebook.com/v24.0/{InstagramWorker._get_instagram_id()}/media", params=params,
                            timeout=10)
        if InstagramWorker._handle_response(r):
            raise Exception("[Instagram Media] Refresh of Instagram credentials was needed")
        r.raise_for_status()
        result = r.json()
        data: list[MediaRecord] = InstagramWorker._parse_payload(result.get("data", []))
        next_cursor = result.get("paging", {}).get("cursors", {}).get("after")
        if next_cursor is not None:
            return data + InstagramWorker._get_all_instagram_media(next_cursor)
        else:
            return data

    @staticmethod
    def _update_token(access_token: str):
        sql = """
                UPDATE instagram_credentials SET access_token = %s
            """
        with db.Database() as cur:
            cur.execute(sql, [access_token])
            try:
                num_rows = getattr(cur, "rowcount", None)
            except Exception:
                num_rows = 0
        if num_rows > 0:
            print(f"[Instagram Credentials] Updated access_token=... for num_rows={num_rows}")
        else:
            print("[Instagram Credentials] Failed to update credentials")

    @staticmethod
    def _check_if_refresh_is_needed() -> bool:
        client_id = os.getenv("INSTAGRAM_CLIENT_ID")
        client_secret = os.getenv("INSTAGRAM_CLIENT_SECRET")
        if os.getenv("DEVELOPMENT_MODE") == "prod":
            client_id = SECRETS_FROM_AWS["instagram_client_id"]
            client_secret = SECRETS_FROM_AWS["instagram_client_secret"]
        params = {
            "input_token": InstagramWorker._get_access_token(),
            "access_token": f"{client_id}|{client_secret}"
        }
        with session_with_retry() as session:
            r = session.get("https://graph.facebook.com/debug_token", params=params, timeout=10)
            r.raise_for_status()
            response = r.json()
            data = response["data"]

        expires_at = data["expires_at"]
        now = int(time.time())

        threshold = 7 * 24 * 60 * 60

        seconds_left = expires_at - now
        days_left = seconds_left / 86400
        print(f"[Instagram Credentials] Token expires in days: {days_left}")
        if seconds_left <= threshold:
            return True
        else:
            return False

    @staticmethod
    def _refresh_access_token_if_needed() -> bool:
        if not InstagramWorker._check_if_refresh_is_needed():
            return False
        client_id = os.getenv("INSTAGRAM_CLIENT_ID")
        client_secret = os.getenv("INSTAGRAM_CLIENT_SECRET")
        if os.getenv("DEVELOPMENT_MODE") == "prod":
            client_id = SECRETS_FROM_AWS["instagram_client_id"]
            client_secret = SECRETS_FROM_AWS["instagram_client_secret"]
        params = {
            "grant_type": "fb_exchange_token",
            "client_id": client_id,
            "client_secret": client_secret,
            "fb_exchange_token": InstagramWorker._get_access_token()
        }
        with session_with_retry() as session:
            r = session.get("https://graph.facebook.com/oauth/access_token", params=params, timeout=10)
            r.raise_for_status()
            tokens = r.json()
            InstagramWorker._update_token(tokens["access_token"])
        return True

    @staticmethod
    def _handle_response(r) -> bool:
        # If 5xx after retries, this may still be 5xx; don't raise log and continue.
        if 500 <= r.status_code <= 599:
            print(f"[Instagram Media] {r.status_code}: {r.text[:200]}")
            raise requests.HTTPError(f"Upstream {r.status_code}")
        return InstagramWorker._refresh_access_token_if_needed()

    @staticmethod
    def run_background_task(stop_event: threading.Event, period: float = constants.POLLING_INTERVAL_SECONDS):
        next_run = time.monotonic()
        while not stop_event.is_set():
            try:
                data: list[MediaRecord] = InstagramWorker._get_all_instagram_media()
                sql = """
                        INSERT INTO instagram_media (media_id, caption, url, timestamp) VALUES (%s, %s, %s, %s)
                    """
                with db.Database() as cur:
                    cur.execute("DELETE FROM instagram_media")
                    cur.executemany(sql, data)
                    try:
                        inserted_id = getattr(cur, "lastrowid", None)
                    except Exception:
                        inserted_id = None
                if inserted_id is not None:
                    print(f"[Instagram Media] Upserted id={inserted_id}")
                else:
                    print("[Instagram Media] Failed to upsert media from Instagram")

            except requests.HTTPError as e:
                print(f"[Instagram] HTTP error: {e}")
            except requests.RequestException as e:
                print(f"[Instagram] Network error: {e}")
            except (KeyError, ValueError, TypeError) as e:
                print(f"[Instagram] Payload parse error: {e}")
            except Exception as e:
                # Don't kill the thread on unexpected log and continue
                print(f"[Instagram] Unexpected error: {e}")

            # schedule next run relative to monotonic clock
            next_run += period
            wait = max(0.0, next_run - time.monotonic())
            if stop_event.wait(wait):
                break

    @staticmethod
    def start() -> tuple[threading.Event, threading.Thread]:
        stop = threading.Event()
        t = threading.Thread(target=InstagramWorker.run_background_task, args=(stop,), daemon=True, name="InstagramWorker")
        t.start()
        return stop, t

    @classmethod
    def _should_refresh_access_tokens(cls):
        pass