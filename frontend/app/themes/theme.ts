import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    cssVariables: true,
    breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1500 },
    },
    palette: {
        primary: {
            main: '#BF9F5E',
        },
        background: {
            default: "#EFEFEF",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#111",
            secondary: "#555"
        },
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                position: 'sticky',
                color: 'default',
                elevation: 4
            },
            styleOverrides: {
                root: ({theme}) => ({
                    top: 0,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'saturate(180%) blur(8px)',
                    [theme.breakpoints.down('xs')]: {
                        height: 50
                    },
                    [theme.breakpoints.only('sm')]: {
                        height: 60
                    },
                    [theme.breakpoints.only('md')]: {
                        height: 70,
                    },
                    [theme.breakpoints.up('lg')]: {
                        height: 82,
                    },
                    [theme.breakpoints.up('xl')]: {
                        borderBottomLeftRadius: theme.shape.borderRadius,
                        borderBottomRightRadius: theme.shape.borderRadius,
                    },
                    '& .MuiContainer-root': {
                        height: 'inherit',
                        minHeight: 'inherit',
                        maxWidth: theme.breakpoints.values.xl
                    },
                }),
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    minHeight: 'inherit',
                    height: '100%',
                    alignItems: 'center',
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 3
            }
        },
    }
});