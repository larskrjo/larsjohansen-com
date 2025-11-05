import ResponsiveAppBar from "~/components/generic/ResponsiveAppBar";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type {ReactNode} from "react";

export function PageSkeleton({ children }: { children?: ReactNode }) {
    return (
        <>
            <Box sx={{ position: 'sticky', top: 0,  bgcolor: 'background.default' }}>
                <Container sx={{ position: 'sticky', top: 0,  bgcolor: 'background.default' }} maxWidth="xl" disableGutters>
                    <ResponsiveAppBar />
                    {children}
                </Container>
            </Box>
        </>
    );
}