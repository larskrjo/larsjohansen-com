import {useMemo} from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {GoogleMap} from "@react-google-maps/api";
import {useJsApiLoader} from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;


const baseOptions: MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy",
};

export default function OneMap({
                    center,
                    label,
                    defaultZoom = 7,
                }: {
    center: google.maps.LatLngLiteral;
    label: string;
    defaultZoom?: number;
}) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-maps-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const options = useMemo(() => baseOptions, []);

    if (loadError) {
        console.error("Google Maps JS API failed to load:", loadError);
        return null;
    }
    if (!isLoaded) return null;

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                width: "100%",
                aspectRatio: "1 / 1",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
                {label}
            </Typography>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={defaultZoom}
                options={options}
            >
            </GoogleMap>
        </Paper>
    );
}