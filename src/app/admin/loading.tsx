
export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="flex justify-end h-0 mb-0">
                <div className="relative -top-16">
                    <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
                </div>
            </div>

            {/* Table/Content Card Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-[#D1D5DB] overflow-hidden">
                {/* Table Header */}
                <div className="h-14 bg-gray-50 border-b border-[#D1D5DB] flex items-center px-6 gap-6">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>

                {/* Table Body Rows */}
                <div className="divide-y divide-[#D1D5DB]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-20 px-6 flex items-center gap-6">
                            <div className="h-4 w-24 bg-gray-100 rounded"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-32 bg-gray-100 rounded"></div>
                                <div className="h-3 w-24 bg-gray-50 rounded"></div>
                            </div>
                            <div className="h-8 w-20 bg-gray-100 rounded-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
