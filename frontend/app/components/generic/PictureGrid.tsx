import {Box, Grid} from "@mui/material";
import type {PictureMedia} from "~/types/types";

export default function PictureGrid({pictureMedia}: {pictureMedia: PictureMedia[]}) {
    return (
        <Grid
            container
            spacing={{xs: 4, sm: 6}}
            sx={{
                justifyContent: "center",
                padding: 4
            }}
        >
            {pictureMedia.map((media, index) => (
                <Grid
                    key={index}
                    size={{ sm: 12, md: 6, lg: 3 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                >
                    <a href={media.url_link} target="_blank" rel="noopener noreferrer">
                        <Box
                            component="img"
                            src={media.image_src}
                            alt={`Image ${index + 1}`}
                            sx={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: 2,
                                boxShadow: 2,
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        />
                    </a>
                </Grid>
            ))}
        </Grid>
    );
}