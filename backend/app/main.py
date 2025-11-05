import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.healthcheck_api import healthcheck_router
from app.api.instagram_media_api import instagram_router
from app.api.strava_activities_api import strava_router
from app.job.instagram_data_worker import InstagramWorker
from app.job.strava_data_worker import StravaWorker

if os.getenv("DEVELOPMENT_MODE") == "prod":
    allowed_origins = "https://larsjohansen.com"
else:
    allowed_origins = "http://larsjohansen.com:5173"

app = FastAPI()

app.include_router(instagram_router)
app.include_router(strava_router)
app.include_router(healthcheck_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

InstagramWorker.start()
StravaWorker.start()