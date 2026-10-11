
'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/app/type'

type SortKey = 'default' | 'asc' | 'desc'

const bn = (value: number, digits = 0) =>
  Number(value ?? 0).toLocaleString('bn-BD', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })

const unitLabel = (unit?: string) =>
  ({
    kg: 'কেজি',
    litre: 'লিটার',
    liter: 'লিটার',
    dozen: 'ডজন',
    piece: 'পিস',
    gram: 'গ্রাম',
    pcs: 'পিস',
  })[unit?.toLowerCase() ?? ''] || unit || 'কেজি'

function ProductCard({ product }: { product: Product }) {
  const image = String(product.image ?? '').trim()
  const isImageUrl = /^https?:\/\/\S+$/i.test(image)
  const isLocalImage = image.startsWith('/') && !image.startsWith('//')

  const trend =
    product.change?.dir === 'up' || product.change?.dir === 'down'
      ? product.change.dir
      : 'flat'

  const change = Number(product.change?.pct ?? 0)

  const href = `/product/${encodeURIComponent(
    String(product.slug || product.id),
  )}`

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-[#e5e9e2] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#8fbd9a] hover:shadow-lg sm:p-5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f1f5ef] text-3xl transition group-hover:bg-[#e7f1e6]">
          {isImageUrl || isLocalImage ? (
            <Image
              src={image}
              alt={product.nameBn || 'পণ্য'}
              width={56}
              height={56}
              unoptimized
              className="h-full w-full object-contain p-1"
            />
          ) : (
            <span>{image || product.categoryIcon || '🛒'}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-base font-bold leading-6 text-[#202a22] sm:text-lg">
            {product.nameBn || 'নাম পাওয়া যায়নি'}
          </h3>
          <p className="mt-1 text-xs text-[#69746b]">
            প্রতি {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-dashed border-[#e4e8e1] pt-4">
        <p className="text-xs font-medium text-[#737d74]">আজকের বাজারদর</p>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-2xl font-extrabold tracking-tight text-[#1c3524]">
            {bn(Number(product.today ?? 0))}
            <span className="ml-1 text-sm font-semibold">টাকা</span>
          </p>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
              trend === 'up'
                ? 'bg-red-50 text-red-700'
                : trend === 'down'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'}
            {bn(Math.abs(change), 1)}%
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-[#267441]">
        <span>বিস্তারিত দেখুন</span>
        <span className="transition group-hover:translate-x-1">→</span>
      </div>
    </Link>
  )
}

export default function CategoryProducts({
  products,
}: {
  products?: Product[] | null
}) {
  const [sort, setSort] = useState<SortKey>('default')

  const productList = Array.isArray(products) ? products : []

  const sorted = useMemo(() => {
    const list = [...productList]

    if (sort === 'asc') {
      list.sort(
        (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0),
      )
    }

    if (sort === 'desc') {
      list.sort(
        (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0),
      )
    }

    return list
  }, [productList, sort])

  const first = productList[0]

  const sortOptions: {
    value: SortKey
    label: string
    icon: string
  }[] = [
    { value: 'default', label: 'ডিফল্ট', icon: '☷' },
    { value: 'asc', label: 'দাম কম', icon: '↑' },
    { value: 'desc', label: 'দাম বেশি', icon: '↓' },
  ]

  return (
    <main className="mx-auto min-h-screen max-w-[1234px] px-4 py-7 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-[#e0e9dd] bg-gradient-to-br from-[#f0f8ed] via-white to-[#e7f4e8] p-6 sm:p-8">
        <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full bg-[#cfe8cd]/40 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white bg-white/90 text-4xl shadow-sm">
            {first?.categoryIcon || '🛒'}
          </div>

          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-[#428252]">
              BAZAR DOR
            </p>
            <h1 className="text-2xl font-extrabold text-[#1f3525] sm:text-3xl">
              {first?.categoryNameBn || 'পণ্যের তালিকা'}
            </h1>
            <p className="mt-2 text-sm text-[#627064]">
              আজকের বাজারদর এক জায়গায়, সহজেই
            </p>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-3">
          <div className="rounded-xl border border-white bg-white/90 px-4 py-3 shadow-sm">
            <p className="text-xs text-[#6b776c]">মোট পণ্য</p>
            <p className="mt-1 text-lg font-extrabold text-[#267441]">
              {bn(productList.length)}টি
            </p>
          </div>

          <div className="rounded-xl border border-white bg-white/90 px-4 py-3 shadow-sm">
            <p className="text-xs text-[#6b776c]">দাম সাজানোর অপশন</p>
            <p className="mt-1 text-sm font-bold text-[#26392a]">
              কম থেকে বেশি / বেশি থেকে কম
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#e5e9e2] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-lg font-bold text-[#243528]">
            সব পণ্য
          </h2>
          <p className="mt-1 text-sm text-[#778077]">
            {bn(sorted.length)}টি পণ্য পাওয়া গেছে
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              aria-pressed={sort === option.value}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                sort === option.value
                  ? 'border-[#267441] bg-[#267441] text-white shadow-sm'
                  : 'border-[#e0e5de] bg-[#fafbf9] text-[#475249] hover:border-[#9cbea2] hover:bg-[#eff7ed]'
              }`}
            >
              <span>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {sorted.length > 0 ? (
        <section className="mt-5 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {sorted.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
            />
          ))}
        </section>
      ) : (
        <section className="mt-6 rounded-3xl border border-dashed border-[#d9e3d6] bg-white px-5 py-16 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#f0f6ed] text-4xl">
            🛒
          </div>
          <h2 className="mt-5 text-xl font-bold text-[#243528]">
            কোনো পণ্য পাওয়া যায়নি
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737d74]">
            API response এবং category ID পরীক্ষা করো। API-তে পণ্য থাকলেও
            category filter না মিললে এই বার্তাটি দেখা যাবে।
          </p>
        </section>
      )}
    </main>
  )
}

