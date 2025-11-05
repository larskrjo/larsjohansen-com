import Grid from "@mui/material/Grid";
import {BAY_AREA_COORDINATES, OSLO_COORDINATES} from "~/data/content";
import OneMap from "~/components/generic/maps/OneMap";

export default function TwoMaps() {

    return (
        <Grid container spacing={10} sx={{ mt: 2 }}>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <OneMap center={OSLO_COORDINATES} label="Born and raised in Oslo, Norway." />
            </Grid>
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <OneMap center={BAY_AREA_COORDINATES} label="Currently living in San Francisco Bay Area, CA." />
            </Grid>
        </Grid>
    );
}
