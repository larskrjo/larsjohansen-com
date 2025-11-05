from fastapi import APIRouter

import app.db.db as db

instagram_router = APIRouter(prefix="/api/v1/instagram", tags=["Instagram Media API"])

@instagram_router.get("/media")
async def get_media() -> list:
    with db.Database() as cur:
        cur.execute("""
            SELECT media_id, url, timestamp
            FROM instagram_media;
        """)
        rows = cur.fetchall()

    if len(rows) == 0:
        return []
    media_entries: list = []
    for row in rows:
        media_entries.append({'media_id': row[0], 'url': row[1], 'timestamp': row[2]})
    return sorted(media_entries, key=lambda x: x['timestamp'], reverse=True)