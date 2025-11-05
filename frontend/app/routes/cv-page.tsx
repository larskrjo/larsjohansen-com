import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../.react-router/types/app/+types/root";
import CvView from "~/components/pages/cv/CvView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CV/Resume" },
        { name: "description", content: "Lars Johansen's CV/Resume Page" },
    ];
}

export default function CvPage() {
    return (
        <PageSkeleton>
            <CvView />
        </PageSkeleton>
    );
}
