import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SideBar from './content/sidebar/SideBar';
import Footer from './content/footer/Footer';
import type {StravaActivity} from "~/types/types";
import {BlogPost} from "~/components/pages/home/content/post/BlogPost";
import PagePaper from "~/components/generic/PagePaper";
import {HOME_PAGE_POST} from "~/data/content";


export default function HomeView({activity}: {activity: StravaActivity | undefined}) {
    return (
        <PagePaper>
            <Container sx={{ py: { xs: 4, md: 6 }}}>
                <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid size={{ xs: 12, md: 8}}>
                        <BlogPost
                            category={HOME_PAGE_POST.category}
                            title={HOME_PAGE_POST.title}
                            date={HOME_PAGE_POST.date}
                            author={HOME_PAGE_POST.author}
                            commentsCount={HOME_PAGE_POST.commentsCount}
                            content={HOME_PAGE_POST.content}
                            readingTime={HOME_PAGE_POST.readingTime}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4}}
                          sx={{
                              display: 'flex',
                          }}>
                        <SideBar activity={activity} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </PagePaper>
    );
}
