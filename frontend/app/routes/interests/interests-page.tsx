import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import InterestsView from "~/components/pages/interests/InterestsView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Interests" },
        { name: "description", content: "Lars Johansen's Interests Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <InterestsView />
        </PageSkeleton>
    );
}
