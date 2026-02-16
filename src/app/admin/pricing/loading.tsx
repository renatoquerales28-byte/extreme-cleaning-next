
export default function Loading() {
    return (
        <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="h-9 w-48 bg-gray-200 rounded-lg mb-8"></div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB] h-48 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                            <div className="h-4 w-full bg-gray-100 rounded"></div>
                        </div>
                        <div className="h-10 w-full bg-gray-100 rounded-lg mt-4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}
