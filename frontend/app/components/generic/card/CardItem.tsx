import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import type {Card} from "~/types/types";

export default function CardItem({ title, subtitle, image, href }: Card) {
    return (
        <Box
            component={href ? 'a' : 'div'}
            href={href}
            sx={{
                position: 'relative',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                overflow: 'hidden',
                '&:hover .tile-media, &:focus-within .tile-media': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                },
                '&:hover .tile-caption, &:focus-within .tile-caption': {
                    transform: 'translate(-50%, -4px)',
                    boxShadow: 4,
                },
                '&:hover .tile-caption-title, &:focus-within .tile-caption-title': {
                    color: 'primary.main'
                },
                // fixed visual height; image will cover
                height: { xs: 280, sm: 300, md: 320 },
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >

            <Box
                className="tile-media"
                component={href ? 'a' : 'div'}
                href={href}
                sx={{
                    position: 'relative',
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: 1,
                    top: 4,
                    transition: 'transform .25s ease, box-shadow .25s ease',
                    // fixed visual height; image will cover
                    height: { xs: 180, sm: 200, md: 220 },
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* (Optional) soft vignette on edges to improve text contrast */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.00) 55%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.10) 100%)',
                    }}
                />
            </Box>

            {/* Floating caption card */}
            <Paper
                className="tile-caption"
                elevation={3}
                sx={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 4,
                    transform: 'translateX(-50%)',
                    transition: 'transform .25s ease, box-shadow .25s ease',
                    px: { xs: 2.5, sm: 3 },
                    py: { xs: 2, sm: 2.5 },
                    borderRadius: 1.5,
                    minWidth: { xs: 240, sm: 280 },
                    textAlign: 'center',
                }}
            >
                <Typography
                    className="tile-caption-title"
                    variant="h5"
                    sx={{ transition: 'color 0.25s ease', fontFamily: 'serif', fontWeight: 500, letterSpacing: '.02em' }}
                >
                    {title}
                </Typography>

                <Divider sx={{ borderBottomWidth: 2, width: 56, mx: 'auto', my: 1.25, opacity: 0.35 }} />

                <Typography
                    variant="subtitle2"
                    sx={{ letterSpacing: '.12em', color: 'text.secondary' }}
                >
                    {subtitle.toUpperCase()}
                </Typography>
            </Paper>

        </Box>
    );
}