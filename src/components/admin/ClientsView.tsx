"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ClientsTable from "./ClientsTable";

interface Props {
    clients: any[];
}

export default function ClientsView({ clients }: Props) {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="flex justify-end h-0 mb-0">
                <div className="relative -top-16">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="px-4 py-2 border border-[#D1D5DB] dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#024653] outline-none text-sm w-64 bg-white dark:bg-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <ClientsTable clients={clients} searchTerm={search} onSearch={setSearch} />
        </>
    );
}
