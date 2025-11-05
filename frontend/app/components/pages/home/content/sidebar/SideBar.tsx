import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

import Divider from '@mui/material/Divider';
import StravaGoogleMap from "~/components/pages/home/content/sidebar/StravaGoogleMap";
import type {StravaActivity} from "~/types/types";

function SectionTitleWithLink(props: { children: React.ReactNode, link: string}) {

    return (
        <Stack alignItems="center" spacing={1.25} sx={{ textAlign: 'center' }}>
            <Typography
                variant="h6"
                sx={{ fontFamily: 'serif',
                    letterSpacing: '.04em',
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center"}}
            >
                <IconButton color="inherit" href={props.link} target="_blank" rel="noreferrer"
                sx={{mr: 1, '&:hover': { color: 'primary.main' }}}>
                    <DirectionsRunIcon fontSize="medium"/>
                </IconButton>
                {props.children}
            </Typography>
            <Divider sx={{ borderBottomWidth: 2, width: 56, mx: 'auto', my: 1.25, opacity: 0.35 }} />
        </Stack>
    );
}

function SectionTitle(props: { children: React.ReactNode}) {
    return (
        <Stack alignItems="center" spacing={1.25} sx={{ textAlign: 'center' }}>
            <Typography
                variant="h6"
                sx={{ fontFamily: 'serif',
                    letterSpacing: '.04em',
                    fontWeight: 500}}
            >
                {props.children}
            </Typography>
            <Divider sx={{ borderBottomWidth: 2, width: 56, mx: 'auto', my: 1.25, opacity: 0.35 }} />
        </Stack>
    );
}

export default function SideBar({activity}: {activity: StravaActivity | undefined}) {
    return (
        <Container sx={{ py: { xs: 0, md: 8 } }}>
            {/* Social */}
            <SectionTitle>Social Media</SectionTitle>

            <Stack direction="row" spacing={4} justifyContent="center" sx={{ mt: 1 }}>
                <IconButton color="inherit" href="https://x.com/larskrjo" target="_blank" rel="noreferrer"
                            sx={{ '&:hover': { color: 'primary.main' } }}>
                    <TwitterIcon fontSize="medium" />
                </IconButton>
                <IconButton color="inherit" href="https://facebook.com/larskrjo" target="_blank" rel="noreferrer"
                            sx={{ '&:hover': { color: 'primary.main' } }}>
                    <FacebookIcon fontSize="medium" />
                </IconButton>
                <IconButton color="inherit" href="https://instagram.com/larskrjo" target="_blank" rel="noreferrer"
                            sx={{ '&:hover': { color: 'primary.main' } }}>
                    <InstagramIcon fontSize="medium" />
                </IconButton>
            </Stack>

            {/* Light divider between sections */}
            <Divider sx={{ borderBottomWidth: 1, width: 'auto', mx: 'auto', my: 5, opacity: 0.35 }} />

            {/* Map */}
            <SectionTitleWithLink link={"https://www.strava.com/activities/" + activity?.activity_id}>Latest Activity</SectionTitleWithLink>

          <Box sx={{ mt: 3, mx: 'auto', maxWidth: 640, borderRadius: 1.5, overflow: 'hidden', boxShadow: 1 }}>
            <StravaGoogleMap />
          </Box>
        </Container>
    );
}
