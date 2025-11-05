import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import DiyProjectsView from "~/components/pages/interests/DiyProjectsView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "DIY Projects" },
        { name: "description", content: "Lars Johansen's DIY Projects Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <DiyProjectsView />
        </PageSkeleton>
    );
}
