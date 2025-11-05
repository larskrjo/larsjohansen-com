import PagePaper from "~/components/generic/PagePaper";
import Footer from "~/components/pages/home/content/footer/Footer";
import {Container, Grid} from "@mui/material";
import Section from "~/components/generic/Section";
import SquareImage from "~/components/generic/SquareImage";
import {TECHNOLOGY_PAGE} from "~/data/content";

export default function TechnologyView() {
    return (
        <PagePaper sx={{ my: { xs: 4, md: 6 } }}>
            <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 5 } }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Section
                            title={TECHNOLOGY_PAGE.title}
                            paragraphs={TECHNOLOGY_PAGE.paragraphs}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{justifyContent: "center", display: 'flex', alignItems: 'center'}} alignContent="center">
                        <SquareImage
                            src={TECHNOLOGY_PAGE.image}
                            alternativeText={TECHNOLOGY_PAGE.altText}
                            maxWidth={600}
                        />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </PagePaper>
    );
}