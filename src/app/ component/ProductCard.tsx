
import { Suspense } from 'react'
import { connection } from 'next/server'
import ProductCards from './ProductCards'
import type { Product } from '../type'

async function ProductList() {
  await connection()

  try {
    const response = await fetch(
      'https://api.abcz.workers.dev/api/bazardor/products',
      {
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }

    const data: Product[] = await response.json()

    return <ProductCards products={data} />
  } catch {
    return (
      <div className="p-6 text-center text-red-500">
        পণ্যের তথ্য লোড করা যায়নি।
      </div>
    )
  }
}

export default function ProductCard() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center">
          লোড হচ্ছে...
        </div>
      }
    >
      <ProductList />
    </Suspense>
  )
}

