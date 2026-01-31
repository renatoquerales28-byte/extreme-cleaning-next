import { getRecentLeads } from "@/app/actions/admin";
import LeadsTable from "@/components/admin/LeadsTable";

export default async function LeadsTableWrapper() {
    const { data: leads, error } = await getRecentLeads();

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                Error loading leads: {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
        );
    }

    return <LeadsTable leads={leads || []} />;
}
