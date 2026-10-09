
'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { Hind_Siliguri } from 'next/font/google'

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || password.length < 8) return
    console.log({ email, password })
  }

  return (
    <div
      className={`${hind.className} flex min-h-screen flex-col items-center justify-center bg-[#f0f5ef] px-4 py-6 text-[#1c2420]`}
    >
      <header className="mb-5 max-w-[400px] text-center">
        <h1 className="mb-1 text-2xl font-bold sm:text-[28px]">সাইন ইন</h1>
        <p className="text-sm leading-relaxed text-[#5e6a63] sm:text-base">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </header>

      <main className="w-full max-w-[400px] rounded-2xl border border-[#e3e8e3] bg-[#fafcfa] px-4 py-5 sm:px-6 sm:py-6">
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-base font-medium"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-[#e3e8e3] bg-white px-4 text-base outline-none transition placeholder:text-[#8a938d] focus:border-[#3b8548] focus:ring-2 focus:ring-[#3b8548]/20"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-base font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="h-12 w-full rounded-xl border border-[#e3e8e3] bg-white px-4 text-base outline-none transition placeholder:text-[#8a938d] focus:border-[#3b8548] focus:ring-2 focus:ring-[#3b8548]/20"
            />
          </div>

          <button
            type="submit"
            className="h-12 w-full cursor-pointer rounded-xl bg-[#3b8548] text-base font-semibold text-white shadow-md shadow-[#3b8548]/20 transition hover:bg-[#2f6e3a] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b8548]"
          >
            সাইন ইন
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-sm text-[#5e6a63]">
          <span className="h-px flex-1 bg-[#e3e8e3]" />
          অথবা
          <span className="h-px flex-1 bg-[#e3e8e3]" />
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/auth/google"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e3e8e3] bg-white text-sm font-semibold transition hover:bg-[#f4f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b8548]"
          >
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="size-5 shrink-0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
              />
              <path
                fill="#FBBC05"
                d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </a>

          <a
            href="/auth/github"
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e3e8e3] bg-white text-sm font-semibold transition hover:bg-[#f4f7f4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b8548]"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="currentColor"
              className="size-5 shrink-0"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </a>
        </div>

        <p className="mt-5 text-center text-sm sm:text-base">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/sign-up"
            className="font-semibold text-[#3b8548] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </main>

      <Link href="/" className="mt-5 text-sm text-[#5e6a63] hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  )
}

