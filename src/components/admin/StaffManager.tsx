"use client";

import { useState, useEffect } from "react";
import { getStaff, createStaff, deleteStaff } from "@/app/actions/calendar";
import { Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
// Removed unused Dialog imports

const COLORS = ["#0891B2", "#05D16E", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

export default function StaffManager({ onUpdate }: { onUpdate?: () => void }) {
    const [staff, setStaff] = useState<any[]>([]);
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState(COLORS[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStaff();
    }, []);

    const loadStaff = async () => {
        const res = await getStaff();
        if (res.success) setStaff(res.data);
    };

    const handleAdd = async () => {
        if (!newName) return;
        setLoading(true);
        const res = await createStaff(newName, newColor);
        if (res.success) {
            toast.success("Staff member added");
            setNewName("");
            loadStaff();
            if (onUpdate) onUpdate();
        } else {
            toast.error("Failed to add staff");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Remove this staff member?")) {
            await deleteStaff(id);
            loadStaff();
            if (onUpdate) onUpdate();
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB]">
            <h3 className="text-sm font-bold text-[#1C1C1C] flex items-center gap-2 mb-4">
                <Users size={16} className="text-[#024653]" /> Staff / Teams
            </h3>

            <div className="space-y-3 mb-4">
                {staff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg group">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: member.color }} />
                            <span className="text-sm font-medium text-slate-700">{member.name}</span>
                        </div>
                        <button
                            onClick={() => handleDelete(member.id)}
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 items-center border-t pt-4">
                <input
                    placeholder="New Team Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 text-sm border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#05D16E]"
                />
                <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-8 h-9 p-0 border-none rounded cursor-pointer"
                />
                <button
                    onClick={handleAdd}
                    disabled={loading || !newName}
                    className="bg-[#024653] text-white p-2 rounded-lg hover:bg-[#023641] disabled:opacity-50"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
}
