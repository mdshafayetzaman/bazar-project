import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Product } from '@/app/type'
import CategoryProducts from '@/app/ component/Details'


interface PageProps {
  params: Promise<{
    categoryid: string
  }>
}

interface ApiProduct extends Omit<Product, 'category' | 'categoryNameBn'> {
  category:
    | string
    | number
    | {
        id?: string | number
        _id?: string
        slug?: string
        name?: string
        nameBn?: string
      }
  categoryId?: string | number
  category_id?: string | number
  categorySlug?: string
  categoryNameBn?: string
}

function extractProducts(result: unknown): ApiProduct[] {
  if (Array.isArray(result)) {
    return result as ApiProduct[]
  }

  if (!result || typeof result !== 'object') {
    return []
  }

  const data = result as Record<string, unknown>

  const nestedData =
    data.data && typeof data.data === 'object' && !Array.isArray(data.data)
      ? (data.data as Record<string, unknown>)
      : undefined

  const candidates = [
    data.products,
    data.data,
    data.results,
    data.items,
    nestedData?.products,
    nestedData?.results,
    nestedData?.items,
    nestedData?.data,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate as ApiProduct[]
    }
  }

  return []
}

function getCategoryValues(product: ApiProduct): string[] {
  const category = product.category

  const values: unknown[] = [
    product.categoryId,
    product.category_id,
    product.categorySlug,
    typeof category === 'string' || typeof category === 'number'
      ? category
      : undefined,
    typeof category === 'object' && category !== null ? category.id : undefined,
    typeof category === 'object' && category !== null
      ? category._id
      : undefined,
    typeof category === 'object' && category !== null
      ? category.slug
      : undefined,
    typeof category === 'object' && category !== null
      ? category.name
      : undefined,
    typeof category === 'object' && category !== null
      ? category.nameBn
      : undefined,
    product.categoryNameBn,
  ]

  return values
    .filter((value) => value !== undefined && value !== null)
    .map((value) => String(value).trim().toLowerCase())
}

async function CategoryContent({ params }: PageProps) {
  const { categoryid } = await params

  let normalizedCategoryId: string

  try {
    normalizedCategoryId = decodeURIComponent(categoryid).trim().toLowerCase()
  } catch {
    notFound()
  }

  const response = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
    {
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`Products API Error: ${response.status}`)
  }

  const result: unknown = await response.json()
  const allProducts = extractProducts(result)

  if (allProducts.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-5xl">📦</div>
        <h1 className="mt-4 text-2xl font-bold text-[#243528]">
          API থেকে কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          API response-এর structure পরীক্ষা করো।
        </p>
      </main>
    )
  }

  const products = allProducts.filter((product) =>
    getCategoryValues(product).includes(normalizedCategoryId),
  )

  if (products.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="text-5xl">🔎</div>
        <h1 className="mt-4 text-2xl font-bold text-[#243528]">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          ক্যাটাগরির URL এবং API-এর category value মিলিয়ে দেখো।
        </p>
      </main>
    )
  }

  const normalizedProducts: Product[] = products.map((product) => {
    const {
      categoryId: _categoryId,
      category_id: _category_id,
      categorySlug: _categorySlug,
      categoryNameBn: _categoryNameBn,
      ...productFields
    } = product

    const category =
      typeof product.category === 'object' && product.category !== null
        ? String(
            product.category.nameBn ??
              product.category.name ??
              product.category.slug ??
              product.category.id ??
              product.category._id ??
              '',
          )
        : String(product.category ?? '')

    const categoryNameBn =
      product.categoryNameBn ??
      (typeof product.category === 'object' && product.category !== null
        ? String(
            product.category.nameBn ??
              product.category.name ??
              product.category.slug ??
              product.category.id ??
              product.category._id ??
              '',
          )
        : String(product.category ?? ''))

    return {
      ...productFields,
      category,
      categoryNameBn,
    }
  })

  return <CategoryProducts products={normalizedProducts} />
}

function CategoryLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    </main>
  )
}

export default function CategoryProductsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryContent params={params} />
    </Suspense>
  )
}
