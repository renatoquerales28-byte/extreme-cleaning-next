import { Suspense } from "react";
import LeadsTableWrapper from "@/components/admin/LeadsTableWrapper";
import ExportLeadsButton from "@/components/admin/ExportLeadsButton";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
    return (
        <div>
            <div className="flex justify-end h-0 mb-0">
                <div className="relative -top-16">
                    <ExportLeadsButton />
                </div>
            </div>

            <Suspense fallback={<Loading />}>
                <LeadsTableWrapper />
            </Suspense>
        </div>
    );
}
