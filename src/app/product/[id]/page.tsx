import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Product } from '../../type'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

const API_URL = 'https://api.api-store.workers.dev/api/bazardor/products'

function formatPrice(value: number) {
  return Number(value).toLocaleString('bn-BD', {
    maximumFractionDigits: 2,
  })
}

function getUnit(unit?: string) {
  const units: Record<string, string> = {
    kg: 'কেজি',
    litre: 'লিটার',
    liter: 'লিটার',
    dozen: 'ডজন',
    piece: 'পিস',
  }

  return units[unit?.toLowerCase() ?? ''] ?? unit ?? 'কেজি'
}

function isValidImage(src?: string) {
  if (!src || typeof src !== 'string') return false

  try {
    const url = new URL(src)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return src.startsWith('/') && !src.startsWith('//')
  }
}

function LoadingProduct() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 h-5 w-48 rounded bg-gray-200" />

        <div className="flex flex-col gap-6 rounded-2xl border border-[#dfe7df] bg-white p-6 sm:flex-row">
          <div className="h-20 w-20 rounded-2xl bg-gray-200" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-56 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#dfe7df] bg-white p-6">
          <div className="mb-5 h-6 w-48 rounded bg-gray-200" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-28 rounded-2xl bg-gray-100" />
            ))}
          </div>

          <div className="mt-8 h-64 rounded-xl bg-gray-100" />
        </div>
      </div>
    </main>
  )
}

/*
  Dynamic data access happens inside this component.
  The parent page renders it within Suspense.
*/
async function ProductDetailsContent({ params }: ProductPageProps) {
  const { id } = await params

  const response = await fetch(API_URL, {
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const products: Product[] = await response.json()

  const product = products.find((item) => String(item.id) === id)

  if (!product) {
    notFound()
  }

  const markets = (product.markets ?? [])
    .map((market) => {
      const min = Number(market.min)
      const max = Number(market.max)

      return {
        ...market,
        min,
        max,
        average: (min + max) / 2,
      }
    })
    .sort((a, b) => a.average - b.average)

  const minPrice =
    markets.length > 0 ? Math.min(...markets.map((market) => market.min)) : 0

  const maxPrice =
    markets.length > 0 ? Math.max(...markets.map((market) => market.max)) : 0

  const averagePrice =
    markets.length > 0
      ? markets.reduce((total, market) => total + market.average, 0) /
        markets.length
      : 0

  const isUp = product.change?.dir === 'up'
  const isDown = product.change?.dir === 'down'
  const image = product.image?.trim()
  const imageIsValid = isValidImage(image)
  const unit = getUnit(product.unit)

  const changePercent = Math.abs(Number(product.change?.pct ?? 0))

  const priceDifference =
    Number(product.today ?? 0) - Number(product.yesterday ?? product.today ?? 0)

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#202a23] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#4b554d]"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link href="/" className="hover:text-green-700">
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="font-medium">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f0f5f0] p-3">
              {imageIsValid ? (
                <Image
                  src={image!}
                  width={120}
                  height={120}
                  alt={product.nameBn}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              ) : (
                <span className="text-4xl">{product.categoryIcon || '📦'}</span>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {unit} · {product.categoryNameBn}
              </p>

              <p className="mt-3 text-sm leading-6">
                গতকালের তুলনায় আজ দাম বেড়েছে বা কমেছে
                {' · '}
                {priceDifference > 0
                  ? 'বেড়েছে '
                  : priceDifference < 0
                    ? 'কমেছে '
                    : 'পরিবর্তন হয়নি '}
                {formatPrice(Math.abs(priceDifference))} টাকা
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex min-w-32 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#f0f5f0] px-5 py-4">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-3xl font-bold">
              {formatPrice(Number(product.today ?? 0))}
            </p>

            <p className="mt-1 text-sm text-gray-500">টাকা / {unit}</p>

            <span
              className={`mt-2 text-sm font-semibold ${
                isUp
                  ? 'text-red-600'
                  : isDown
                    ? 'text-green-700'
                    : 'text-gray-500'
              }`}
            >
              {isUp ? '▲' : isDown ? '▼' : '—'} {formatPrice(changePercent)}%
            </span>
          </div>
        </section>

        {/* Price Summary and Market Table */}
        <section className="mt-6 rounded-2xl border border-[#dfe7df] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#dfe7df] p-5">
              <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                ৳{formatPrice(minPrice)}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] p-5">
              <p className="text-sm text-gray-600">সর্বাধিক দাম</p>

              <p className="mt-1 text-2xl font-bold text-red-600">
                ৳{formatPrice(maxPrice)}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe7df] p-5">
              <p className="text-sm text-gray-600">গড় দাম</p>

              <p className="mt-1 text-2xl font-bold text-green-700">
                ৳{formatPrice(averagePrice)}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                প্রতি {unit}-এর হিসাবে
              </p>
            </div>
          </div>

          {/* Market Table */}
          <div className="mt-7">
            <h2 className="mb-4 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

            <div className="overflow-hidden rounded-2xl border border-[#dfe7df]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                  <thead className="bg-[#f8fbf8] text-gray-500">
                    <tr>
                      <th className="px-4 py-4 font-semibold sm:px-5">বাজার</th>

                      <th className="px-4 py-4 font-semibold sm:px-5">বিভাগ</th>

                      <th className="px-4 py-4 text-right font-semibold sm:px-5">
                        সর্বনিম্ন
                      </th>

                      <th className="px-4 py-4 text-right font-semibold sm:px-5">
                        সর্বাধিক
                      </th>

                      <th className="px-4 py-4 text-right font-semibold sm:px-5">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${market.division}`}
                        className={`border-t border-[#dfe7df] transition hover:bg-green-50 ${
                          index % 2 === 0 ? 'bg-[#fbfdfb]' : 'bg-[#f0f5f0]'
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium sm:px-5">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-gray-700 sm:px-5">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right sm:px-5">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right sm:px-5">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right font-bold sm:px-5">
                          ৳{formatPrice(market.average)}
                        </td>
                      </tr>
                    ))}

                    {markets.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-gray-500"
                        >
                          এই পণ্যের বাজারের তথ্য পাওয়া যায়নি।
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              গড় দাম = (সর্বনিম্ন দাম + সর্বাধিক দাম) ÷ ২। বাজারগুলো গড় দাম
              অনুযায়ী সাজানো।
            </p>
          </div>
        </section>

        <div className="py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900"
          >
            ← সব পণ্যে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  )
}

/*
  Keep params access inside the Suspense boundary.
  This allows Next.js to stream the dynamic route.
*/
export default function ProductDetails({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<LoadingProduct />}>
      <ProductDetailsContent params={params} />
    </Suspense>
  )
}
