import sys
from urllib import request

URL = "http://127.0.0.1:8000/healthcheck"
TIMEOUT = 2

try:
    with request.urlopen(URL, timeout=TIMEOUT) as r:
        if r.status == 200:
            sys.exit(0)
        sys.exit(1)
except Exception:
    # Connection errors / timeouts -> unhealthy
    sys.exit(1)