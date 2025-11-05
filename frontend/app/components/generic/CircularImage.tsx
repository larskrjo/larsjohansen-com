import Box from "@mui/material/Box";

export default function CircularImage(props : {src: string, alternativeText: string, maxWidth?: number}) {
    return (
        <Box
            sx={{
                width: "100%",               // fills all available space
                aspectRatio: "1 / 1",        // keeps it square
                borderRadius: "50%",         // makes it circular
                overflow: "hidden",          // ensures image doesn't bleed outside
                ...(props.maxWidth && { maxWidth: props.maxWidth }),
            }}
        >
            <Box
                component="img"
                src={props.src}
                alt={props.alternativeText}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",        // cover to fill without stretching
                }}
            />
        </Box>
    );
}