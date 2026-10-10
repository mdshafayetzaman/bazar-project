
import MarqueeText from 'react-marquee-text'

type Product = {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  categoryIcon?: string
  image?: string
  today: number
  yesterday: number
  unit?: string
  change?: {
    dir: 'up' | 'down'
    pct: number
  }
}

const Marquee = async () => {
  const response = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
    {
      next: {
        revalidate: 60,
      },
    },
  )

  if (!response.ok) {
    throw new Error('Products fetch failed')
  }

  const data: Product[] = await response.json()

  return (
    <div className="mt-5 overflow-hidden border-0 bg-blue-100 py-3 shadow-none outline-none">
      <MarqueeText
        direction="right"
        pauseOnHover
        duration={13}
        className="border-0 outline-none"
      >
        <div className="flex items-center gap-10">
          {data.map((item) => {
            const changePercent =
              item.yesterday > 0
                ? ((item.today - item.yesterday) / item.yesterday) * 100
                : 0

            const isUp = changePercent > 0
            const isDown = changePercent < 0

            return (
              <div
                key={item.id}
                className="flex shrink-0 items-center gap-2"
              >
                <span className="text-base">
                  {item.categoryIcon ?? item.image ?? '🛒'}
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {item.nameBn}
                </span>

                <span className="text-sm font-bold text-gray-900">
                  {item.today} ৳/{item.unit ?? 'একক'}
                </span>

                <span
                  className={`text-sm font-bold ${
                    isUp
                      ? 'text-green-600'
                      : isDown
                        ? 'text-red-500'
                        : 'text-gray-500'
                  }`}
                >
                  {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                  {Math.abs(changePercent).toFixed(1)}%
                </span>

                <span className="ml-2 text-gray-300">•</span>
              </div>
            )
          })}
        </div>
      </MarqueeText>
    </div>
  )
}

export default function HomePage() {
  return <Marquee />
}

