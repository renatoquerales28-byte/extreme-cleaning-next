"use client";

export default function NewsletterTable({ subscribers }: { subscribers: any[] }) {

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Date Subscribed</th>
                            <th className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Email Address</th>
                            <th className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">City</th>
                            <th className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">Source</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {subscribers && subscribers.length > 0 ? (
                            subscribers.map((sub: any) => (
                                <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                        <div>{new Date(sub.createdAt).toLocaleDateString()}</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-500">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900 dark:text-slate-100">{sub.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                        {sub.city}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                            {sub.source.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                    No subscribers found yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
