import Image from 'next/image'
import Link from 'next/link'
import logoIcon from '@/app/logo-icon.png'
import Nablinks from './Nablinks'
import Date from './Date'

type NavProps = {
  logo?: string
}

export default function Nav({ logo = 'বাজার দর' }: NavProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[88px] items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 shadow-md shadow-green-600/20 transition duration-300 group-hover:bg-green-700 group-hover:shadow-lg">
              <Image
                src={logoIcon}
                alt="বাজার দর"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 transition-colors group-hover:text-green-700 sm:text-3xl">
                {logo}
              </span>

              <span className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
                <Date></Date>
              </span>
            </div>
          </Link>

          <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/sign-in"
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:px-5"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="rounded-xl bg-green-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg sm:px-5"
            >
              সাইন আপ
            </Link>
          </nav>
        </div>

        <div className="border-t border-gray-100">
          <Nablinks />
        </div>
      </div>
    </header>
  )
}
