import Image from 'next/image'

interface Product {
  id: string | number
  nameBn: string
  categoryNameBn?: string
  image: string
  today: number
  yesterday?: number
  unit: string
  changePercent?: number
}

interface ProductsDetailsProps {
  product: Product
}

const ProductsDetails = ({ product }: ProductsDetailsProps) => {
  const image = product.image?.trim() || ''
  const isImageUrl = /^https?:\/\/\S+$/i.test(image)
  const isLocalImage = image.startsWith('/') && !image.startsWith('//')
  const isEmoji = image.length > 0 && !isImageUrl && !isLocalImage

  const change =
    product.changePercent ??
    (product.yesterday && product.yesterday !== 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0)

  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'flat'

  const badgeColor =
    trend === 'up'
      ? 'text-red-600'
      : trend === 'down'
        ? 'text-green-600'
        : 'text-gray-600'

  const badgeIcon = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '—'

  const bn = (value: number, digits = 0) =>
    value.toLocaleString('bn-BD', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })

  return (
    <>


      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
            {isImageUrl || isLocalImage ? (
              <Image
                width={52}
                height={52}
                src={image}
                alt={product.nameBn}
                className="h-full w-full object-contain"
                unoptimized
              />
            ) : isEmoji ? (
              <span className="text-2xl" role="img" aria-label={product.nameBn}>
                {image}
              </span>
            ) : (
              <span className="text-2xl" role="img" aria-label={product.nameBn}>
                🛒
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-gray-900">
              {product.nameBn}
            </h2>
            <p className="text-xs text-gray-500">
              {product.categoryNameBn || 'পণ্য'}
            </p>
            <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-xl font-bold text-gray-900">
              {bn(product.today)}{' '}
              <span className="text-sm font-normal">টাকা</span>
            </p>

            <span
              className={`inline-flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold ${badgeColor}`}
            >
              <span className="text-[10px]" aria-hidden="true">
                {badgeIcon}
              </span>
              {bn(change, 1)}%
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsDetails
