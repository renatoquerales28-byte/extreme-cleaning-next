import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";

export default function QuotePage() {
    return (
        <div className="h-screen w-full bg-slate-50 flex items-center justify-center overflow-hidden relative">
            <div className="w-full h-full md:h-auto md:max-h-[90vh] md:aspect-[4/3] relative flex flex-col justify-center">
                <ExtremeCleaningWizard />
            </div>
            {/* Background elements if needed */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('/noise.png')]" />
        </div>
    );
}
