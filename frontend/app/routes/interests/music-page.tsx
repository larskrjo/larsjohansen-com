import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import MusicView from "~/components/pages/interests/MusicView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Music" },
        { name: "description", content: "Lars Johansen's Music Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <MusicView />
        </PageSkeleton>
    );
}
