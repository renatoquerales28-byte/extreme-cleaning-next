
export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="h-9 w-48 bg-gray-200 rounded-lg mb-8"></div>

            {/* Create New Skeleton */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB] mb-8 h-40"></div>

            {/* List Skeleton */}
            <div className="grid gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-[#D1D5DB] h-24 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                            <div className="space-y-2 flex-1 max-w-[200px]">
                                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                                <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
