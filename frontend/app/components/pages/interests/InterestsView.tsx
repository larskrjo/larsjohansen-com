import PagePaper from "~/components/generic/PagePaper";
import Footer from "~/components/pages/home/content/footer/Footer";
import CardGrid from "~/components/generic/card/CardGrid";
import {INTEREST_PAGE_CATEGORIES} from "~/data/content";

export default function InterestsView() {
    return (
        <PagePaper sx={{ my: { xs: 4, md: 6 } }}>
            <CardGrid cards={INTEREST_PAGE_CATEGORIES} />
            <Footer />
        </PagePaper>
    );
}