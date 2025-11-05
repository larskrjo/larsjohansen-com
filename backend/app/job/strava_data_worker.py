import os
import threading
import time

import requests

import app.constants.constants as constants
import app.db.db as db
from app.constants.secrets import SECRETS_FROM_AWS
from app.network.session import session_with_retry


def _parse_payload(result: dict) -> tuple[int, str]:
    return result.get('id'), result.get('map').get('summary_polyline')

class StravaWorker:

    @staticmethod
    def get_access_token():
        with db.Database() as cur:
            cur.execute("""
                SELECT access_token FROM strava_credentials LIMIT 1
            """)
            rows = cur.fetchall()
        return rows[0][0]

    @staticmethod
    def get_refresh_token():
        with db.Database() as cur:
            cur.execute("""
                SELECT refresh_token FROM strava_credentials LIMIT 1
            """)
            rows = cur.fetchall()
        return rows[0][0]

    @staticmethod
    def insert_tokens(refresh_token: str, access_token: str):
        sql = """
                INSERT INTO strava_credentials (refresh_token, access_token) VALUES (%s, %s)
            """
        with db.Database() as cur:
            cur.execute("DELETE FROM strava_credentials")
            cur.execute(sql, (refresh_token, access_token))
            try:
                inserted_id = getattr(cur, "lastrowid", None)
            except Exception:
                inserted_id = None
        if inserted_id is not None:
            print(f"[Strava Credentials] Upserted id={inserted_id} access_token=... refresh_token=...")
        else:
            print("[Strava Credentials] Failed to update credentials from Strava")

    @staticmethod
    def _refresh_access_tokens():
        refresh_token = StravaWorker.get_refresh_token()
        client_id = os.getenv("STRAVA_CLIENT_ID")
        client_secret = os.getenv("STRAVA_CLIENT_SECRET")
        if os.getenv("DEVELOPMENT_MODE") == "prod":
            client_id = SECRETS_FROM_AWS["strava_client_id"]
            client_secret = SECRETS_FROM_AWS["strava_client_secret"]

        token_url = "https://www.strava.com/oauth/token"

        headers = {
            "Content-Type": "application/x-www-form-urlencoded",
        }

        data = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": client_id,
            "client_secret": client_secret,
        }

        try:
            response = requests.post(token_url, headers=headers, data=data)
            response.raise_for_status()
            tokens = response.json()
            access_token = tokens.get("access_token")
            new_refresh_token = tokens.get("refresh_token")

            StravaWorker.insert_tokens(new_refresh_token, access_token)
            return access_token

        except requests.RequestException as e:
            print(f"[Strava Credentials] Token refresh failed: {e}")
            return None

    @staticmethod
    def _handle_response(r):
        # If 5xx after retries, this may still be 5xx; don't raise log and continue.
        if 500 <= r.status_code <= 599:
            print(f"[Strava Activities] {r.status_code}: {r.text[:200]}")
            raise requests.HTTPError(f"Upstream {r.status_code}")
        if 401 == r.status_code:
            return StravaWorker._refresh_access_tokens()
        return None

    @staticmethod
    def run_background_task(stop_event: threading.Event, period: float = constants.POLLING_INTERVAL_SECONDS):
        next_run = time.monotonic()

        while not stop_event.is_set():
            authorization_header_value = f"Bearer {StravaWorker.get_access_token()}"
            headers = {
                "Authorization": authorization_header_value
            }
            try:
                with session_with_retry() as s:
                    r = s.get("https://www.strava.com/api/v3/athlete/activities?per_page=1", headers=headers, timeout=10)
                    if StravaWorker._handle_response(r) is not None:
                        continue
                    r.raise_for_status()
                    result = r.json()

                    r = s.get(f"https://www.strava.com/api/v3/activities/{result[0]['id']}", headers=headers, timeout=10)
                    if StravaWorker._handle_response(r) is not None:
                        continue
                    r.raise_for_status()
                    result = r.json()

                activity_id, polyline_summary = _parse_payload(result)

                sql = """
                        INSERT INTO strava_activities (activity_id, polyline) VALUES (%s, %s)
                    """
                with db.Database() as cur:
                    cur.execute("DELETE FROM strava_activities")
                    cur.execute(sql, (activity_id, polyline_summary))
                    try:
                        inserted_id = getattr(cur, "lastrowid", None)
                    except Exception:
                        inserted_id = None
                if inserted_id is not None:
                    print(f"[Strava Activities] Upserted id={inserted_id} activity_id={activity_id}")
                else:
                    print("[Strava Activities] Failed to upsert activity from Strava")

            except requests.HTTPError as e:
                print(f"[Strava] HTTP error: {e}")
            except requests.RequestException as e:
                print(f"[Strava] Network error: {e}")
            except (KeyError, ValueError, TypeError) as e:
                print(f"[Strava] Payload parse error: {e}")
            except Exception as e:
                # Don't kill the thread on unexpected log and continue
                print(f"[Strava] Unexpected error: {e}")

            # schedule next run relative to monotonic clock
            next_run += period
            wait = max(0.0, next_run - time.monotonic())
            if stop_event.wait(wait):
                break

    @staticmethod
    def start() -> tuple[threading.Event, threading.Thread]:
        stop = threading.Event()
        t = threading.Thread(target=StravaWorker.run_background_task, args=(stop,), daemon=True, name="StravaWorker")
        t.start()
        return stop, t