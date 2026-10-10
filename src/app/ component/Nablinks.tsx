
'use cache'

import Link from 'next/link'
import { cacheLife } from 'next/cache'

interface Category {
  id: string | number
  slug: string
  nameBn: string
  icon: string
}

interface NablinksProps {
  activeSlug?: string
}

const Nablinks = async ({ activeSlug }: NablinksProps) => {
  cacheLife('hours')

  const response = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/categories',
  )

  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }

  const data: Category[] = await response.json()

  return (
    <nav className="border-b border-[#dfe7df] bg-[#fbfdfb]">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        {data.map((item) => {
          const active = activeSlug === item.slug

          return (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                active
                  ? 'bg-green-700 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.nameBn}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Nablinks

