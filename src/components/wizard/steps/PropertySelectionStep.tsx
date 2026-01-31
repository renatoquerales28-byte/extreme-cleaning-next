"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { Building, MapPin } from "lucide-react";

interface PropertySelectionStepProps {
    onSelect: (prop: any) => void;
    onBack: () => void;
    customerName: string;
    properties: any[];
}

export default function PropertySelectionStep({ onSelect, onBack, customerName, properties }: PropertySelectionStepProps) {
    const { setAction } = useWizardAction();

    useEffect(() => {
        setAction({
            label: "", // Hidden button
            onClick: () => { },
            disabled: true,
            // We use a hack or just standard secondary content
            // Since we haven't implemented 'hideButton' yet, I will verify if I can just use secondary content
            // My implementation: 
            // {action.secondaryContent && (...)}
            // <button ... className="..."> ... </button>
            // The button is always rendered if action is present and !hide.
            // I should update ExtremeCleaningWizard to respect `hideButton` property.
            // For now, I will use a dummy button or...
            // Actually, I'll update ExtremeCleaningWizard in the next step to support `hideMainButton`.
            // Here I'll pass `hideMainButton: true` (which I'll add to the interface).
            hideMainButton: true,
            secondaryContent: (
                <button onClick={onBack} className="pointer-events-auto text-[10px] font-black uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2 bg-white/80 px-4 rounded-full shadow-sm backdrop-blur-sm">
                    Not {customerName}? Switch account
                </button>
            )
        } as any); // Type cast until I update the interface
    }, [onBack, customerName, setAction]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Welcome <br /> <span className="text-[#05D16E]">{customerName}</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Select a property to clean</p>
                    </div>

                    <div className="grid gap-4">
                        {properties.map((prop) => (
                            <button
                                key={prop.id}
                                onClick={() => onSelect(prop.id)}
                                className="group p-6 bg-white border-2 border-slate-50 hover:border-[#05D16E] rounded-[2rem] text-left transition-all shadow-sm hover:shadow-md flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F9F8F2] rounded-2xl flex items-center justify-center text-[#024653] group-hover:bg-[#05D16E] group-hover:text-white transition-colors">
                                        <Building size={24} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-[#024653] group-hover:text-[#05D16E] transition-colors">{prop.address}</h3>
                                        <div className="flex items-center gap-1 text-[#024653]/40 text-xs font-bold uppercase tracking-wider">
                                            <MapPin size={10} /> {prop.city}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}

                        <button
                            onClick={() => onSelect(0)} // 0 = New Property
                            className="p-6 border-2 border-dashed border-[#024653]/10 hover:border-[#05D16E] rounded-[2rem] text-center text-[#024653]/40 hover:text-[#05D16E] hover:bg-[#05D16E]/5 transition-all font-black uppercase tracking-widest text-xs"
                        >
                            + Add New Property
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
