import { Suspense } from "react";
import LeadsTableWrapper from "@/components/admin/LeadsTableWrapper";
import ExportLeadsButton from "@/components/admin/ExportLeadsButton";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif text-[#1C1C1C] dark:text-white">Recent Leads</h1>
                <ExportLeadsButton />
            </div>

            <Suspense fallback={<Loading />}>
                <LeadsTableWrapper />
            </Suspense>
        </div>
    );
}
