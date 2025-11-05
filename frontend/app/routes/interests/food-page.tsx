import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../../.react-router/types/app/+types/root";
import FoodView from "~/components/pages/interests/FoodView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "LJ | Food" },
        { name: "description", content: "Lars Johansen's Food Page" },
    ];
}

export default function InterestsPage() {
    return (
        <PageSkeleton>
            <FoodView />
        </PageSkeleton>
    );
}
