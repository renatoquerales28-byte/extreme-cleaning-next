
import { Suspense } from "react";
import ClientsTableWrapper from "@/components/admin/ClientsTableWrapper";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Clients & History</h1>
            <Suspense fallback={<Loading />}>
                <ClientsTableWrapper />
            </Suspense>
        </div>
    );
}
