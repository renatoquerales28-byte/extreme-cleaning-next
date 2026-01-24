import { Suspense } from "react";
import LeadsTableWrapper from "@/components/admin/LeadsTableWrapper";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Recent Leads</h1>

            <Suspense fallback={<Loading />}>
                <LeadsTableWrapper />
            </Suspense>
        </div>
    );
}
