
import { getClients } from "@/app/actions/admin";
import ClientsView from "@/components/admin/ClientsView";

export default async function ClientsTableWrapper() {
    const { data: clients, error } = await getClients();

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                Error loading clients. Please try again later.
            </div>
        );
    }

    return <ClientsView clients={clients || []} />;
}
