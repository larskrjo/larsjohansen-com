import PagePaper from "~/components/generic/PagePaper";
import Footer from "~/components/pages/home/content/footer/Footer";
import {Container, Grid} from "@mui/material";
import Section from "~/components/generic/Section";
import SquareImage from "~/components/generic/SquareImage";
import {SPORTS_PAGE} from "~/data/content";

export default function SportsView() {
    return (
        <PagePaper sx={{ my: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 5 } }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Section
                            title={SPORTS_PAGE.title}
                            paragraphs={SPORTS_PAGE.paragraphs}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{justifyContent: "center", display: 'flex', alignItems: 'center'}} alignContent="center">
                        <SquareImage
                            src={SPORTS_PAGE.image}
                            alternativeText={SPORTS_PAGE.altText}
                            maxWidth={600}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </PagePaper>
    );
}