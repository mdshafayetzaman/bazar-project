import Image from 'next/image'
import Link from 'next/link'
import DateDisplay from './Date'
import Banner from '@/app/bazar-hero.png'

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-6 overflow-hidden rounded-[24px] border border-gray-200 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-9 lg:grid-cols-2 lg:px-10 lg:py-10">
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-2 text-base font-bold text-green-700 sm:text-lg">
            <span className="text-xl">🛒</span>
            <span>
              <DateDisplay />
            </span>
          </div>

          <h1 className="max-w-xl text-3xl font-extrabold leading-[1.25] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম
            <br />
            এক নজরে
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-base font-bold text-white shadow-md shadow-green-700/20 transition duration-300 hover:-translate-y-1 hover:bg-green-800 hover:shadow-lg sm:px-6 sm:py-3.5"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative flex min-h-[160px] items-center justify-center sm:min-h-[200px] lg:min-h-[260px]">
          <div className="absolute h-40 w-40 rounded-full bg-green-100/70 blur-3xl sm:h-52 sm:w-52" />

          <Image
            src={Banner}
            alt="তাজা বাজারের পণ্য ভর্তি ঝুড়ি"
            width={300}
            height={300}
            priority
            className="relative h-auto w-full max-w-[180px] object-contain drop-shadow-sm sm:max-w-[240px] lg:max-w-[300px]"
          />
        </div>
      </div>
    </section>
  )
}
