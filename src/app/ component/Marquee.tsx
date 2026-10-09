
import MarqueeText from 'react-marquee-text'

type Product = {
  id: number
  slug: string
  nameBn: string
  category: string
  categoryNameBn: string
  price?: number
  emoji?: string
  unit?: string
  change?: number
  changePercent?: number
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
    <div className="mt-5 overflow-hidden border-0 bg-blue-100 py-3 shadow-none outline-none focus:outline-none">
      <MarqueeText
        direction="right"
        pauseOnHover
        duration={13}
        className="border-0 outline-none focus:border-0 focus:outline-none"
      >
        <div className="flex items-center gap-10 border-0 outline-none focus:border-0 focus:outline-none">
          {data.map((item) => {
            const isUp = (item.changePercent ?? 0) >= 0

            return (
              <div
                key={item.id}
                className="flex shrink-0 items-center gap-2 border-0 outline-none focus:border-0 focus:outline-none"
              >
                <span className="text-base">
                  {item.emoji ?? '🛒'}
                </span>

                <span className="text-sm font-semibold text-gray-800">
                  {item.nameBn}
                </span>

                <span className="text-sm font-bold text-gray-900">
                  {item.price ?? '—'} ৳/{item.unit ?? 'একক'}
                </span>

                <span
                  className={
                    isUp
                      ? 'text-sm font-bold text-green-600'
                      : 'text-sm font-bold text-red-500'
                  }
                >
                  {isUp ? '▲' : '▼'}{' '}
                  {Math.abs(item.changePercent ?? 0)}%
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

