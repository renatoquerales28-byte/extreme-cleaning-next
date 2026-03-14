import { Suspense } from "react";
import NewsletterTableWrapper from "@/components/admin/NewsletterTableWrapper";
import Loading from "../loading";

export const dynamic = 'force-dynamic';

export default function AdminNewsletterPage() {
    return (
        <div>

            <Suspense fallback={<Loading />}>
                <NewsletterTableWrapper />
            </Suspense>
        </div>
    );
}
