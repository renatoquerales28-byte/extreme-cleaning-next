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
                <div className="bg-white rounded-xl shadow-sm border border-[#D1D5DB] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-[#D1D5DB]">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Date</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Name</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Service</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Price</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D1D5DB]">
                                {leads && leads.length > 0 ? (
                                    leads.map((lead: any) => (
                                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-[#1C1C1C]">
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-[#1C1C1C]">{lead.firstName} {lead.lastName}</div>
                                                <div className="text-sm text-[#6B7280]">{lead.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-[#1C1C1C]">
                                                {lead.serviceType}
                                                <div className="text-sm text-[#6B7280]">{lead.frequency}</div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#0891B2]">
                                                ${lead.totalPrice}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                    }`}>
                                                    {lead.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-[#6B7280]">
                                            No leads found yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
