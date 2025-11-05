import {useMemo} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";

const oslo = { lat: 59.9139, lng: 10.7522 };
const bayArea = { lat: 37.5189, lng: -122.1511 };

const baseOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy",
};

function OneMap({
                    center,
                    label,
                    defaultZoom = 7,
                }: {
    center: google.maps.LatLngLiteral;
    label: string;
    defaultZoom?: number;
}) {
    const options = useMemo(() => baseOptions, []);

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2,
                width: "100%",
                aspectRatio: "1 / 1", // ✅ square
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
                {/*<Marker position={center} />*/}
            </GoogleMap>
        </Paper>
    );
}

export default function TwoMaps() {
    const { isLoaded } = useJsApiLoader({
        id: "google-maps-script",
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    if (!isLoaded) return null;

    return (
        <Grid container spacing={10} sx={{ mt: 2 }}>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <OneMap center={oslo} label="Born and raised in Oslo, Norway." />
            </Grid>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <OneMap center={bayArea} label="Currently living in San Francisco Bay Area, CA." />
            </Grid>
        </Grid>
    );
}
