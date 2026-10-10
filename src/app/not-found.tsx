
'use client'

import Link from 'next/link'
import { Home, SearchX } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-primary/10 text-primary shadow-lg shadow-primary/10">
          <SearchX size={64} strokeWidth={1.5} />
          <span className="absolute -right-3 -top-3 rounded-full bg-error px-3 py-1 text-sm font-bold text-white">
            404
          </span>
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Page Not Found
        </p>

        <h1 className="mb-4 text-3xl font-extrabold text-base-content sm:text-5xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-base-content/60">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
          নাম পরিবর্তন করা হয়েছে অথবা পেজটি বর্তমানে উপলব্ধ নেই।
        </p>

        <Link
          href="/"
          className="btn btn-primary gap-2 rounded-xl px-6 text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
        >
          <Home size={19} />
          হোম পেজে ফিরে যান
        </Link>

        <div className="mt-12 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-base-300" />
          <span className="text-xs font-medium tracking-widest text-base-content/40">
            ERROR 404
          </span>
          <span className="h-px w-12 bg-base-300" />
        </div>
      </div>
    </div>
  )
}

export default NotFound

