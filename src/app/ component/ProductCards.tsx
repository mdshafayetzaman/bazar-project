'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '../type'
import Image from 'next/image'

interface ProductCardsProps {
  products: Product[]
}

export default function ProductCards({ products }: ProductCardsProps) {
  const [sort, setSort] = useState('high')

  const formatNumber = (value: number) =>
    Number(value ?? 0).toLocaleString('bn-BD')

  const sortedProducts = [...products].sort((a, b) =>
    sort === 'high' ? b.today - a.today : a.today - b.today,
  )

  const isValidImage = (image: string | undefined) => {
    if (!image || typeof image !== 'string') return false

    try {
      const url = new URL(image)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return image.startsWith('/') && !image.startsWith('//')
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-[#202a23]">সব পণ্য</h2>
          <p className="mt-1 text-sm text-gray-500">
            মোট {formatNumber(products.length)}টি পণ্য
          </p>
        </div>

    
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sortedProducts.map((product) => {
          const isUp = product.change?.dir === 'up'
          const isDown = product.change?.dir === 'down'
          const image = product.image?.trim()
          const validImage = isValidImage(image)

          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex min-h-[147px] flex-col justify-between rounded-[18px] border border-[#dfe7df] bg-[#fbfdfb] p-[17px] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#f0f5f0] text-[26px]">
                  {validImage ? (
                    <Image
                      src={image!}
                      alt={product.nameBn}
                      width={52}
                      height={52}
                      unoptimized
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    product.categoryIcon || '📦'
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold leading-6 text-[#202a23]">
                    {product.nameBn}
                  </h3>

                  <p className="text-[12px] text-[#465047]">
                    প্রতি{' '}
                    {product.unit === 'kg'
                      ? 'কেজি'
                      : product.unit === 'litre' || product.unit === 'liter'
                        ? 'লিটার'
                        : product.unit === 'dozen'
                          ? 'ডজন'
                          : product.unit === 'piece'
                            ? 'পিস'
                            : product.unit || 'কেজি'}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-2">
                <div>
                  <p className="mb-1 text-[12px] text-[#465047]">আজকের দাম</p>

                  <p className="text-[20px] font-bold leading-none text-[#202a23]">
                    {formatNumber(product.today)}{' '}
                    <span className="text-[15px] font-normal">টাকা</span>
                  </p>
                </div>

                <div
                  className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${
                    isUp
                      ? 'bg-red-50 text-red-600'
                      : isDown
                        ? 'bg-green-50 text-green-600'
                        : 'bg-[#f0f5f0] text-[#202a23]'
                  }`}
                >
                  <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                  <span>
                    {formatNumber(Math.abs(Number(product.change?.pct ?? 0)))}%
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
