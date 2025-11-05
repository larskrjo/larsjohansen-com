from fastapi import APIRouter
from pydantic import BaseModel

from datetime import timezone
from zoneinfo import ZoneInfo

import app.db.db as db

strava_router = APIRouter(prefix="/api/v1/strava", tags=["Strava Activities"])

class ActivityEntry(BaseModel):
    id: int
    activity_id: int
    polyline: str

@strava_router.get("/activities/recent", response_model=ActivityEntry)
async def get_recent_activity():
    with db.Database() as cur:
        cur.execute("""
            SELECT id, activity_id, polyline
            FROM strava_activities
            LIMIT 1;
        """)
        rows = cur.fetchall()

    if len(rows) == 0:
        return None
    return ActivityEntry(id=rows[0][0], activity_id=rows[0][1], polyline=rows[0][2])
