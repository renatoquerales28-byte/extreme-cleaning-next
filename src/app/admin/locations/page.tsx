"use client";

import React, { useEffect, useState } from "react";
import { getAllServiceAreas, upsertServiceArea, deleteServiceArea } from "@/app/actions/location";
import { MapPin, Plus, Trash2, Edit2, Check, X, AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";

type ServiceArea = {
    id: number;
    zipCode: string;
    city: string | null;
    status: "active" | "coming_soon";
};

export default function LocationsPage() {
    const [areas, setAreas] = useState<ServiceArea[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            zipCode: "",
            city: "",
            status: "active" as "active" | "coming_soon"
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadAreas = async () => {
        setIsLoading(true);
        const res = await getAllServiceAreas();
        if (res.success && res.data) {
            // @ts-ignore
            setAreas(res.data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadAreas();
    }, []);

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            const res = await upsertServiceArea({
                zip: data.zipCode,
                city: data.city,
                status: data.status
            });

            if (res.success) {
                reset();
                loadAreas();
                setIsEditing(null);
            } else {
                alert("Failed to save location");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this location?")) return;
        const res = await deleteServiceArea(id);
        if (res.success) {
            loadAreas();
        } else {
            alert("Failed to delete");
        }
    };

    const startEdit = (area: ServiceArea) => {
        setValue("zipCode", area.zipCode);
        setValue("city", area.city || "");
        setValue("status", area.status);
        setIsEditing(area.id); // For visual feedback only, logic is upsert by ZIP
    };

    const cancelEdit = () => {
        reset();
        setIsEditing(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-[#024653] tracking-tighter">Service Locations</h1>
                    <p className="text-slate-500 font-medium">Manage where you operate.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Form Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                    <h2 className="text-xl font-bold text-[#024653] mb-4 flex items-center gap-2">
                        {isEditing ? <Edit2 size={20} /> : <Plus size={20} />}
                        {isEditing ? "Edit Location" : "Add New Location"}
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Zip Code</label>
                            <input
                                {...register("zipCode", { required: true, minLength: 5, maxLength: 5 })}
                                className="w-full p-3 bg-slate-50 border rounded-lg font-bold text-[#024653] outline-none focus:border-[#05D16E]"
                                placeholder="90210"
                                disabled={!!isEditing} // PK cannot be changed in this simple UI
                            />
                            {isEditing && <p className="text-[10px] text-amber-500">To change Zip, delete and re-create.</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">City Name</label>
                            <input
                                {...register("city")}
                                className="w-full p-3 bg-slate-50 border rounded-lg font-bold text-[#024653] outline-none focus:border-[#05D16E]"
                                placeholder="Beverly Hills"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</label>
                            <select
                                {...register("status")}
                                className="w-full p-3 bg-slate-50 border rounded-lg font-bold text-[#024653] outline-none focus:border-[#05D16E]"
                            >
                                <option value="active">Active (Serviceable)</option>
                                <option value="coming_soon">Coming Soon (Waitlist)</option>
                            </select>
                        </div>

                        <div className="flex gap-2 pt-4">
                            {isEditing && (
                                <button type="button" onClick={cancelEdit} className="flex-1 p-3 bg-slate-100 text-slate-500 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 p-3 bg-[#024653] text-white font-bold rounded-xl hover:bg-[#02333d] transition-colors flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? "Saving..." : isEditing ? "Update" : "Add Location"}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-[#024653] mb-6 flex items-center gap-2">
                        <MapPin size={20} />
                        Existing Areas ({areas.length})
                    </h2>

                    {isLoading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-50 rounded-xl" />)}
                        </div>
                    ) : areas.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                            <p>No locations found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {areas.map((area) => (
                                <div key={area.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${area.status === 'active' ? 'bg-[#05D16E]/10 text-[#05D16E]' : 'bg-amber-100 text-amber-600'}`}>
                                            {area.status === 'active' ? <Check size={20} /> : <AlertTriangle size={20} />}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-[#024653]">{area.zipCode}</h3>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{area.city || "Unknown City"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${area.status === 'active' ? 'bg-[#05D16E]/10 text-[#05D16E]' : 'bg-amber-100 text-amber-600'}`}>
                                            {area.status.replace('_', ' ')}
                                        </span>
                                        <button
                                            onClick={() => startEdit(area)}
                                            className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-500 transition-colors"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(area.id)}
                                            className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
