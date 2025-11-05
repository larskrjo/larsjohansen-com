import Link from "@mui/material/Link";


export default function InvisibleLink({ href, flex, children }: { href: string, flex: boolean, children: React.ReactNode }) {
    if (flex) {
        return <Link href={href}
                     sx={{
                         flexGrow: 1,
                         display: { xs: 'flex', md: 'none'},
                         color: "inherit",           // same as surrounding text
                         textDecoration: "none",     // remove underline
                         "&:hover": {
                             textDecoration: "none",   // keep it off on hover too
                             color: "inherit",         // no color change on hover
                         },
                     }}>
            {children}
        </Link>
    }
    return <Link href={href}
          sx={{
              color: "inherit",           // same as surrounding text
              textDecoration: "none",     // remove underline
              "&:hover": {
                  textDecoration: "none",   // keep it off on hover too
                  color: "inherit",         // no color change on hover
              },
          }}>
        {children}
    </Link>
}