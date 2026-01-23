import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";

export default function QuotePage() {
    return (
        <div className="h-[100dvh] w-full bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative">
            <div className="w-full h-full max-w-5xl max-h-[90vh] relative flex flex-col justify-center">
                <ExtremeCleaningWizard />
            </div>
            {/* Background elements if needed */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('/noise.png')]" />
        </div>
    );
}
