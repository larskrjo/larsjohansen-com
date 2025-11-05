import {PageSkeleton} from "~/components/PageSkeleton";
import type {Route} from "../../.react-router/types/app/+types/root";
import ContactView from "~/components/pages/contact/ContactView";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "LJ | Contact" },
        { name: "description", content: "Lars Johansen's Contact Page" },
    ];
}

export default function ContactPage() {
    return (
        <PageSkeleton>
            <ContactView />
        </PageSkeleton>
    );
}
