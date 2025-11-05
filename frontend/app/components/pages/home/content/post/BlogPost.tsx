import { Box, Typography, Divider, Link } from "@mui/material";

type BlogPostProps = {
    category: string;
    title: string;
    date: string;
    author: string;
    commentsCount?: number;
    content: string;
    readingTime: string;
};

export function BlogPost({
                             category,
                             title,
                             date,
                             author,
                             commentsCount = 0,
                             content,
                             readingTime,
                         }: BlogPostProps) {
    return (
        <Box sx={{ maxWidth: 700, mx: "auto", my: 6 }}>
            {/* 🖤 Header Section */}
            <Box
                sx={{
                    bgcolor: "grey.100", // light/dark background
                    py: 4,
                    px: 2,
                    borderRadius: 1,
                    textAlign: "center",
                }}
            >
                {/* Category */}
                <Typography
                    variant="overline"
                    sx={{
                        display: "block",
                        mb: 1,
                        letterSpacing: 2,
                        color: "text.secondary",
                    }}
                >
                    {category.toUpperCase()}
                </Typography>

                {/* Title */}
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontFamily: "serif",
                        fontWeight: 500,
                        mb: 1,
                    }}
                >
                    {title}
                </Typography>

                {/* Meta info */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontStyle: "italic" }}
                >
                    {date} • by{" "}
                    <Link href="#" underline="hover" color="inherit">
                        {author}
                    </Link>{" "}
                    • {commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}
                </Typography>
            </Box>

            {/* Body Content */}
            <Typography
                variant="body1"
                sx={{
                    mt: 4,
                    lineHeight: 1.8,
                    fontSize: "1.1rem",
                    fontFamily: "Georgia, serif",
                    whiteSpace: "pre-line",
                }}
            >
                {content}
            </Typography>

            <Divider sx={{ mt: 4 }} />

            {/* Footer / Reading time */}
            <Typography
                variant="body2"
                sx={{
                    mt: 2,
                    fontStyle: "italic",
                    color: "text.secondary",
                }}
            >
                Reading time: {readingTime}
            </Typography>
        </Box>
    );
}
