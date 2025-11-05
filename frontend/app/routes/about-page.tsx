import {PageSkeleton} from "~/components/PageSkeleton";
import AboutView from "~/components/pages/about/AboutView";
import type {Route} from "../../.react-router/types/app/+types/root";
import type {InstagramMedia, PictureMedia} from "~/types/types";
import {INSTAGRAM_MEDIA_IDS} from "~/data/content";
import {INSTAGRAM_MEDIA_API} from "~/data/paths";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "About" },
        { name: "description", content: "Lars Johansen's About Page" },
    ];
}

export async function clientLoader() {
    const res = await fetch(INSTAGRAM_MEDIA_API, {});
    let result: InstagramMedia[] = await res.json();
    const finalResult: PictureMedia[] = [];
    for (let image of result) {
        if (INSTAGRAM_MEDIA_IDS.includes(image.media_id)) {
            finalResult.push({image_src: image.url, url_link: image.url});
        }
    }
    return finalResult;
}

export default function AboutPage({loaderData}: Route.ComponentProps) {
    return (
        <PageSkeleton>
            <AboutView instagramMedia={loaderData || []}/>
        </PageSkeleton>
    );
}
