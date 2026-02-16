
import { getClients } from "@/app/actions/admin";
import ClientsTable from "@/components/admin/ClientsTable";

export default async function ClientsTableWrapper() {
    const { data: clients, error } = await getClients();

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                Error loading clients. Please try again later.
            </div>
        );
    }

    return <ClientsTable clients={clients || []} />;
}
