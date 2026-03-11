import { Suspense } from "react";
import NewsletterTableWrapper from "@/components/admin/NewsletterTableWrapper";
import Loading from "../loading";

export const dynamic = 'force-dynamic';

export default function AdminNewsletterPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-[#024653] dark:text-white">Newsletter Subscribers</h1>
            </div>

            <Suspense fallback={<Loading />}>
                <NewsletterTableWrapper />
            </Suspense>
        </div>
    );
}
