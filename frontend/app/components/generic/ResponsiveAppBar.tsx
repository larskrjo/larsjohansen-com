import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CodeOffIcon from "@mui/icons-material/CodeOff";
import CodeIcon from "@mui/icons-material/Code";
import InvisibleLink from "~/components/generic/InvisibleLink";

const pages = [{id: 'home', title: 'Home'}, {id: 'about', title: 'About'}, {id: 'interests', title: 'Interests'}, {id: 'cv', title: 'CV / Resume'}, {id: 'contact', title: 'Contact'}];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(null);
        if (event.currentTarget.id == 'home') {
            window.location.href = '/';
        } else if (event.currentTarget.id == 'about') {
            window.location.href = '/about';
        } else if (event.currentTarget.id == 'interests') {
            window.location.href = '/interests';
        } else if (event.currentTarget.id == 'cv') {
            window.location.href = '/cv';
        } else if (event.currentTarget.id == 'contact') {
            window.location.href = '/contact';
        }
    };

    return (
        <AppBar>
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem id={page.id} key={page.id} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <InvisibleLink flex={true} href="/">
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'}, alignItems: 'center' }}>
                            <CodeIcon sx={{mr: 0.5 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                sx={{
                                    mr: 0.5,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Lars Johansen
                            </Typography>
                            <CodeOffIcon sx={{mr: 0.5, transform: "scaleX(-1)"}} />
                        </Box>
                    </InvisibleLink>

                    <InvisibleLink flex={false} href="/">
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center'}}>
                            <CodeIcon sx={{mr: 0.5 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 0.5,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Lars Johansen
                            </Typography>
                            <CodeOffIcon sx={{mr: 0.5, transform: "scaleX(-1)"}} />
                        </Box>
                    </InvisibleLink>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'flex-end' }}>
                        {pages.map((page) => (
                            <Button
                                id={page.id}
                                key={page.id}
                                onClick={handleCloseNavMenu}
                                disableRipple
                                sx={{ my: 2, color: 'inherit', display: 'block', marginRight: 2,
                                    transition: 'color 0.25s ease',
                                    '&:hover': {
                                        backgroundColor: '#0000',
                                        color: 'primary.main'
                                    } }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;