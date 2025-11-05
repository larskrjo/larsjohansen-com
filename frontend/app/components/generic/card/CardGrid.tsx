import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardItem from '~/components/generic/card/CardItem';
import type {Card} from "~/types/types";

export default function CardGrid({cards} : {cards: Card[] }) {
    return (
        <Container sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
                {cards.map((item) => (
                    <Grid size={{ xs: 12, md: 4}}>
                        <CardItem {...item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
