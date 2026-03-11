
import { Suspense } from "react";
import ClientsTableWrapper from "@/components/admin/ClientsTableWrapper";
import Loading from "./loading";

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
    return (
        <Suspense fallback={<Loading />}>
            <ClientsTableWrapper />
        </Suspense>
    );
}
