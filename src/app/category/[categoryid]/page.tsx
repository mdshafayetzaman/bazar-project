import ProductsDetails from "@/app/ component/Details"



export const instant = false

interface Product {
  id: string | number
  nameBn: string
  image: string
  today: number
  unit: string
  categoryId?: string | number
  category?: string
}

interface CategoryProductsProps {
  params: Promise<{
    categoryid: string
  }>
}

const CategoryProducts = async ({ params }: CategoryProductsProps) => {
  const { categoryid } = await params

  const response = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
  )

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  const result = await response.json()

  const allProducts: Product[] = Array.isArray(result)
    ? result
    : result.data ?? []

  const products = allProducts.filter(
    (product) =>
      String(product.categoryId ?? product.category ?? '') === categoryid,
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductsDetails key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  )
}

export default CategoryProducts

