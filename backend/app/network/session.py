import requests
from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter


def session_with_retry() -> requests.Session:
    retry = Retry(
        total=6,
        backoff_factor=0.8,
        status_forcelist=[500, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526],
        allowed_methods={"GET", "HEAD", "OPTIONS"},
        raise_on_status=False,
    )
    s = requests.Session()
    s.mount("https://", HTTPAdapter(max_retries=retry))
    return s