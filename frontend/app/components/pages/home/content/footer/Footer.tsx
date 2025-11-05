import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";


export default function Footer() {
    return (
        <>
            <Divider sx={{ borderBottomWidth: 1, width: 'auto', mx: 'auto', my: 1, opacity: 0.35 }} />
            <Typography sx={{
                textAlign: "center",   // 👈 centers text horizontally
                py: 2,                 // optional: padding top/bottom
            }}>
                © 2025 Lars Johansen. All rights reserved.
            </Typography>
            <Divider sx={{ borderBottomWidth: 1, width: 'auto', mx: 'auto', my: 1, opacity: 0.35 }} />
        </>
    );
}
