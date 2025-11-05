import UnknownView from "~/components/pages/unknown/UnknownView";
import type {Route} from "../../.react-router/types/app/+types/root";
import {PageSkeleton} from "~/components/PageSkeleton";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "LJ | Error!" },
        { name: "description", content: "Unknown Page" },
    ];
}

export default function UnknownPage() {
  return (
    <PageSkeleton>
        <UnknownView />
    </PageSkeleton>
  );
}
