import {Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import type {ContactItem} from "~/types/types";

export default function HeaderSection({item}: {item: ContactItem}) {
    return (
        <Grid key={item.label} size={{ xs: 12 }}>
            <Card
                variant="outlined"
                sx={{
                    borderWidth: 2,
                    borderRadius: 2.5,
                    overflow: "hidden",
                }}
            >
                {/* Header bar */}
                <Box
                    sx={{
                        bgcolor: (t) => t.palette.grey[900],
                        color: (t) => t.palette.common.white,
                        px: 2.5,
                        py: 1.25,
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {item.label}
                    </Typography>
                </Box>

                {/* Body */}
                <CardContent sx={{ py: 2.25, px: 2.5 }}>
                    {item.href || item.value.startsWith("http") ? (
                        <Link
                            href={item.href ?? item.value}
                            underline="hover"
                            target={item.value.startsWith("http") ? "_blank" : undefined}
                            rel={item.value.startsWith("http") ? "noopener noreferrer" : undefined}
                            sx={{ fontSize: "1.05rem" }}
                        >
                            {item.value}
                        </Link>
                    ) : (
                        <Typography sx={{ fontSize: "1.05rem" }}>{item.value}</Typography>
                    )}
                </CardContent>
            </Card>
        </Grid>
    );
}