import Link from 'next/link'

type Category = {
  id: string
  slug: string
  nameBn: string
  icon: string
}

const Nablinks = async () => {
  const response = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/categories',
    {
      next: {
        revalidate: 3600,
      },
    },
  )

  const data: Category[] = await response.json()

  return (
    <div className="flex gap-5 font-bold text-gray-700">
      {data.map((item) => (
        <Link key={item.id} href={`/${item.slug}`}>
          {item.icon} {item.nameBn}
        </Link>
      ))}
    </div>
  )
}

export default Nablinks
