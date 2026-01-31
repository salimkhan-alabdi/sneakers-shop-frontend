export default function ProductCardSkeleton() {
  return (
    <div className="h-full bg-gray-50 overflow-hidden flex flex-col animate-pulse">
      <div className="p-3 flex flex-col h-full">
        <div className="h-[200px] w-full bg-gray-200 mb-3" />

        <div className="h-3 w-16 bg-gray-200 mb-2 rounded" />

        <div className="space-y-2 mb-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-3.5 bg-gray-200 rounded-full" />
          ))}
        </div>

        <div className="mt-auto flex justify-between items-end border-t pt-2 border-dashed border-gray-100">
          <div className="h-6 w-24 bg-gray-200 rounded" />
          <div className="h-5 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
