import { SectionTitle } from './section-title'

export function WebhookDetailsSkeleton() {
  return (
    <div className="flex h-full flex-col">
      {/* Header Skeleton */}
      <div className="space-y-4 border-b border-zinc-700 p-6">
        <div className="flex items-center gap-3">
          <div className="h-6 w-16 animate-pulse rounded bg-zinc-700" />
          <div className="h-6 w-64 animate-pulse rounded bg-zinc-700" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
          <span className="w-px h-4 bg-zinc-700" />
          <div className="h-4 w-48 animate-pulse rounded bg-zinc-700" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Request Overview Skeleton */}
          <div className="space-y-4">
            <SectionTitle>
              <div className="h-5 w-40 animate-pulse rounded bg-zinc-700" />
            </SectionTitle>
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                {[1, 2, 3, 4].map((i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-700 last:border-0"
                  >
                    <td className="p-3 bg-zinc-800/50 border-r border-zinc-700">
                      <div className="h-4 w-24 animate-pulse rounded bg-zinc-700" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-32 animate-pulse rounded bg-zinc-700" />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          {/* Headers Skeleton */}
          <div className="space-y-4">
            <SectionTitle>
              <div className="h-5 w-20 animate-pulse rounded bg-zinc-700" />
            </SectionTitle>
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-700 last:border-0"
                  >
                    <td className="p-3 bg-zinc-800/50 border-r border-zinc-700">
                      <div className="h-4 w-28 animate-pulse rounded bg-zinc-700" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-48 animate-pulse rounded bg-zinc-700" />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          {/* Query Parameters Skeleton */}
          <div className="space-y-4">
            <SectionTitle>
              <div className="h-5 w-36 animate-pulse rounded bg-zinc-700" />
            </SectionTitle>
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full">
                {[1, 2].map((i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-700 last:border-0"
                  >
                    <td className="p-3 bg-zinc-800/50 border-r border-zinc-700">
                      <div className="h-4 w-20 animate-pulse rounded bg-zinc-700" />
                    </td>
                    <td className="p-3">
                      <div className="h-4 w-36 animate-pulse rounded bg-zinc-700" />
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          {/* Request Body Skeleton */}
          <div className="space-y-4">
            <SectionTitle>
              <div className="h-5 w-28 animate-pulse rounded bg-zinc-700" />
            </SectionTitle>
            <div className="overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-4 animate-pulse rounded bg-zinc-700"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

