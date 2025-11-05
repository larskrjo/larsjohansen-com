import PagePaper from "~/components/generic/PagePaper";
import {Container} from "@mui/material";
import Section from "~/components/generic/Section";
import {UNKNOWN_PAGE} from "~/data/content";
import Footer from "~/components/pages/home/content/footer/Footer";


export default function UnknownView() {
    return (
    <PagePaper sx={{ my: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 5 } }}>
            <Section
                title={UNKNOWN_PAGE.title}
                paragraphs={UNKNOWN_PAGE.paragraphs}
            />
        </Container>
        <Footer />
    </PagePaper>
    );
}