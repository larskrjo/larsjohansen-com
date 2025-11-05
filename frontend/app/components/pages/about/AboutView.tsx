import {Container, Divider, Grid} from "@mui/material";
import CircularImage from "~/components/generic/CircularImage";
import Footer from "~/components/pages/home/content/footer/Footer";
import PagePaper from "~/components/generic/PagePaper";
import GoogleMapsImage from "~/components/generic/maps/TwoMaps";
import type {PictureMedia} from "~/types/types";
import PictureGrid from "~/components/generic/PictureGrid";
import Section from "~/components/generic/Section";

export default function AboutView({instagramMedia}: {instagramMedia: PictureMedia[]}) {
    return (
        <PagePaper>
            <Container maxWidth="lg" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 5 } }}>
                {/* ——— About Me ——— */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Section
                            icon="✨"
                            title="About Me"
                            paragraphs={[
                                <>
                                    Hey there — I’m <strong>Lars K. Johansen</strong>, and I currently live in the{" "}
                                    <strong>San Francisco Bay Area, California</strong>.
                                </>,
                                <>
                                    I grew up in <strong>Oslo, Norway</strong>, and from a young age I was fascinated by technology.
                                    One of my earliest memories is playing multi-player <em>Warcraft II</em> on my family’s 266&nbsp;MHz
                                    computer using IPX across our LAN. I’ll never forget the shouting across the house when we had to
                                    agree on a map — those were great times.
                                </>,
                                <>
                                    I was lucky to have both encouragement and opportunities to explore my interests, which eventually
                                    guided me toward a career in software engineering and brought me across the world to the heart of
                                    the tech industry.
                                </>,
                            ]}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{justifyContent: "center", display: 'flex', alignItems: 'center'}} alignContent="center">
                        <CircularImage
                            src="/images/avatar.png"
                            alternativeText="Lars Kristian Johansen"
                            maxWidth={600}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* ——— Early Interests ——— */}
                <Section
                    icon="🧭"
                    title="Early Interests"
                    paragraphs={[
                        <>
                            My passion for technology started early and shaped much of my life, but it’s always been balanced by a
                            love for <strong>music</strong> and <strong>sports</strong>.
                        </>,
                        <>
                            Growing up, I tried everything from soccer and basketball to track and gymnastics — but{" "}
                            <strong>tennis</strong> and <strong>running</strong> are the two that stuck with me. They remain part
                            of my weekly routine today.
                        </>,
                        <>
                            I love connecting with other athletes and often share my runs and matches on <strong>Strava</strong>.
                            If you’d like to follow along, you’ll find more details on my contact page.
                        </>,
                    ]}
                />

                <Divider sx={{ my: 3 }} />

                {/* ——— Creativity in the Kitchen ——— */}
                <Section
                    icon="👨‍🍳"
                    title="Creativity in the Kitchen"
                    paragraphs={[
                        <>
                            In recent years, I’ve developed a deep interest in <strong>food and cooking</strong>. While I don’t
                            aspire to become a professional chef, I genuinely enjoy experimenting, learning new techniques,
                            and refining my skills.
                        </>,
                        <>For me, cooking is more than just making meals — it’s a creative outlet and a meaningful way to connect with people.</>,
                    ]}
                />

                <Divider sx={{ my: 3 }} />

                {/* ——— Sharing Moments That Matter ——— */}
                <Section
                    icon="🌿"
                    title="Sharing Moments That Matter"
                    paragraphs={[
                        <>
                            I’m not very active on social media, so you won’t often see daily updates from me. But when something
                            meaningful or memorable happens, I love sharing those moments — whether it’s a great run, a meal I’m
                            proud of, or time spent with people I care about.
                        </>,
                    ]}
                />
                <GoogleMapsImage />
            </Container>
            <Divider sx={{ my: 2 }} />
            <PictureGrid pictureMedia={instagramMedia} />
            <Footer />
        </PagePaper>
    );
}