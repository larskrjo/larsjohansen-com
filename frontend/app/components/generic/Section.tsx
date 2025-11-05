import {Box, Typography} from "@mui/material";


export default function Section({
                     icon,
                     title,
                     paragraphs,
                 }: {
    icon?: string;
    title: string;
    paragraphs: React.ReactNode[];
}) {
    return (
        <Box sx={{ my: { xs: 2, md: 3 } }}>
            <Typography
                variant="h5"
                component="h1"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 2,
                    fontWeight: 700,
                }}
            >
                {icon &&<span aria-hidden>{icon}</span>} {title}
            </Typography>

            {paragraphs.map((p, i) =>
                typeof p === "string" ? (
                    <Typography
                        key={i}
                        component="div" // 👈 ensures DOM element for dangerouslySetInnerHTML typings
                        sx={{ mb: 1.5, lineHeight: 1.85, fontSize: { xs: "1rem", md: "1.05rem" } }}
                        dangerouslySetInnerHTML={{ __html: p }} // 👈 p is string here
                    />
                ) : (
                    <Typography
                        key={i}
                        sx={{ mb: 1.5, lineHeight: 1.85, fontSize: { xs: "1rem", md: "1.05rem" } }}
                    >
                        {p}
                    </Typography>
                )
            )}
        </Box>
    );
}