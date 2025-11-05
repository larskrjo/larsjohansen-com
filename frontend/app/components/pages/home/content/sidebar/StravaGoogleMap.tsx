import {STRAVA_ACTIVITIES_RECENT_API} from "~/data/paths";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import polyline from "@mapbox/polyline";
import { useEffect, useMemo, useRef, useState } from "react";

export default function StravaMap() {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

    const mapRef = useRef<google.maps.Map | null>(null);
    const [coords, setCoords] = useState<google.maps.LatLngLiteral[] | null>(null);
    const [center, setCenter] = useState<google.maps.LatLngLiteral>({ lat: 37.3382, lng: -121.8863 });
    const [zoom, setZoom] = useState(12);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({ mapTypeId: "terrain", disableDefaultUI: true }),
        []
    );

    useEffect(() => {
        (async () => {
            const data = await fetch(STRAVA_ACTIVITIES_RECENT_API).then(r => r.json()).catch(() => null);
            const p = data?.polyline;
            if (!p) return;

            const decoded = polyline.decode(p);
            const path = decoded
                .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng))
                .map(([lat, lng]) => ({ lat, lng })) as google.maps.LatLngLiteral[];

            if (path.length) setCoords(path);
        })();
    }, []);

    // Unique key so the map remounts cleanly when coords change (fixes reload/hydration/StrictMode issues)
    const mapKey =
        coords && coords.length
            ? `${coords[0].lat},${coords[0].lng}-${coords[coords.length - 1].lat},${coords[coords.length - 1].lng}`
            : "empty";

    if (!isLoaded) return <div>Loading…</div>;

    return (
        <div style={{ height: 260, borderRadius: 12, overflow: "hidden" }}>
            {/* render map only when coords are ready */}
            {coords && (
                <GoogleMap
                    key={mapKey}
                    onLoad={(m) => {
                        mapRef.current = m;
                        const b = new google.maps.LatLngBounds();
                        const allSame = coords.every(c => c.lat === coords[0].lat && c.lng === coords[0].lng);
                        if (allSame) {
                            m.setCenter(coords[0]);
                            m.setZoom(15);
                            setCenter(coords[0]);
                            setZoom(15);
                            return;
                        }
                        coords.forEach(c => b.extend(c));
                        // ensure container has size before fitting
                        requestAnimationFrame(() => {
                            m.fitBounds(b, 20);
                            google.maps.event.addListenerOnce(m, "idle", () => {
                                setCenter(m.getCenter()!.toJSON());
                                setZoom(m.getZoom() ?? 12);
                            });
                        });
                    }}
                    onUnmount={() => { mapRef.current = null; }}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    // controlled AFTER onLoad/idle has run
                    center={center}
                    zoom={zoom}
                    options={mapOptions}
                >
                    <Polyline options={{ path: coords, strokeColor: "#f44336", strokeWeight: 3 }} />
                </GoogleMap>
            )}
        </div>
    );
}
