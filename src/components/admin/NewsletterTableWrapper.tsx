import { getNewsletterSubscribers } from "@/app/actions/newsletter";
import NewsletterTable from "./NewsletterTable";

export default async function NewsletterTableWrapper() {
    const res = await getNewsletterSubscribers();

    if (!res.success) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
                Error loading subscribers: {res.error}
            </div>
        );
    }

    return <NewsletterTable subscribers={res.subscribers || []} />;
}
