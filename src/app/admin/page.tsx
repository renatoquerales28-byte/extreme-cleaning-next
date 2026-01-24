import LeadsTable from "@/components/admin/LeadsTable";
import { getRecentLeads } from "@/app/actions/admin";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const { data: leads, error } = await getRecentLeads();

    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Recent Leads</h1>

            {error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                    Error loading leads. Please check your database connection.
                </div>
            ) : (
                <LeadsTable leads={leads || []} />
            )}
        </div>
    );
}
