export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden bg-gray-50">
      <div className="flex h-full flex-col p-3">
        <div className="mb-3 h-[200px] w-full bg-gray-200" />

        <div className="mb-2 h-3 w-16 rounded bg-gray-200" />

        <div className="mb-3 space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>

        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-3.5 rounded-full bg-gray-200" />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-dashed border-gray-100 pt-2">
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="h-5 w-12 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
