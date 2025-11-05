import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../+types/root";
import CardGrid from "~/components/generic/card/CardGrid";
import HomeView from "~/components/pages/home/HomeView";
import {INTEREST_PAGE_CATEGORIES} from "~/data/content";
import {STRAVA_ACTIVITIES_RECENT_API} from "~/data/paths";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Home" },
        { name: "description", content: "Lars Johansen's Home Page" },
    ];
}

export async function clientLoader() {
    const res = await fetch(STRAVA_ACTIVITIES_RECENT_API, {});
    return await res.json();
}

export default function HomePage({loaderData}: Route.ComponentProps) {
    return (
        <PageSkeleton>
            <CardGrid cards={INTEREST_PAGE_CATEGORIES.slice(0, 3)} />
            <HomeView activity={loaderData}/>
        </PageSkeleton>
    );
}
