import { Paper, type PaperProps } from "@mui/material";
import type {PropsWithChildren} from "react";

export default function PagePaper({children, ...props}: PropsWithChildren<PaperProps>) {
    return (
        <Paper
            {...props}
            sx={{
                mb: { xs: 2, sm: 4, md: 8 },
                ...{...props.sx}
            }}
        >
            {children}
        </Paper>
    );
}