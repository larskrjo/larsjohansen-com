import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import SportsView from "~/components/pages/interests/SportsView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Sports" },
        { name: "description", content: "Lars Johansen's Sports Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <SportsView />
        </PageSkeleton>
    );
}
