export function WebhooksListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-lg transition-colors duration-150"
          >
            <div className="flex items-start gap-3 px-4 py-2.5">
              {/* Checkbox skeleton */}
              <div className="h-4 w-4 animate-pulse rounded border border-zinc-700 bg-zinc-800" />
              
              {/* Content skeleton */}
              <div className="flex flex-1 min-w-0 items-start gap-3">
                {/* Method skeleton */}
                <div className="w-12 shrink-0">
                  <div className="h-4 w-10 animate-pulse rounded bg-zinc-700" />
                </div>
                
                {/* Pathname and date skeleton */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="h-3.5 w-full animate-pulse rounded bg-zinc-700" />
                  <div className="h-3 w-24 animate-pulse rounded bg-zinc-700" />
                </div>
              </div>
              
              {/* Delete button skeleton (hidden, matching the opacity-0 behavior) */}
              <div className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

