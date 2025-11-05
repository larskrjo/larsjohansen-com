let BASE_URL;
if (import.meta.env.DEV) {
    BASE_URL = "http://api.larsjohansen.com:8000";
} else {
    BASE_URL = 'https://api.larsjohansen.com';
}

const API_V1 = BASE_URL + '/api/v1';
export const STRAVA_ACTIVITIES_RECENT_API = API_V1 + '/strava/activities/recent';
export const INSTAGRAM_MEDIA_API = API_V1 + '/instagram/media';