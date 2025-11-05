import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import TechnologyView from "~/components/pages/interests/TechnologyView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Technology" },
        { name: "description", content: "Lars Johansen's Technology Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <TechnologyView />
        </PageSkeleton>
    );
}
