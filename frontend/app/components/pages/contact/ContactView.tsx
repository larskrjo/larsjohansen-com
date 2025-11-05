import PagePaper from "~/components/generic/PagePaper";
import Footer from "~/components/pages/home/content/footer/Footer";
import {Container, Grid, Typography} from "@mui/material";
import {BAY_AREA_COORDINATES, CONTACTS} from "~/data/content";
import HeaderSection from "~/components/generic/HeaderSection";
import OneMap from "~/components/generic/maps/OneMap";

export default function ContactView() {
    return (
        <PagePaper sx={{ my: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 5 } }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <ContactCards />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{justifyContent: "center", display: 'flex', alignItems: 'flex-start', pt: { xs: 3, md: 5 }}} alignContent="center">
                        <OneMap center={BAY_AREA_COORDINATES} label="Currently living in San Francisco Bay Area, CA." />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </PagePaper>
    );
}

function ContactCards() {
    return (
        <Container sx={{ my: { xs: 4, md: 6 } }}>
            <Typography sx={{ mb: 2, lineHeight: 1.7 }}>
                If you’d like to get in touch with me, I have several ways to be contacted.
            </Typography>

            <Grid container spacing={3} sx={{pr: {xs: 0, md: 10, lg: 20}}}>
                {CONTACTS.map((item) => (
                    <HeaderSection key={item.id} item={item} />
                ))}
            </Grid>
        </Container>
    );
}