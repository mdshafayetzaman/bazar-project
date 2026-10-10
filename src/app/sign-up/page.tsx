
'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Hind_Siliguri } from 'next/font/google'
import { authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
})

export default function SignUpPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<
    'google' | 'github' | null
  >(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 8) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।')
      return
    }

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মিলছে না।')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
        callbackURL: '/',
      })

      if (error) {
        toast.error(error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি।')
        return
      }

      toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে! 🎉')
      router.replace('/')
      router.refresh()
    } catch {
      toast.error('সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = async (
    provider: 'google' | 'github',
  ) => {
    setSocialLoading(provider)

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: '/',
      })

      if (error) {
        toast.error(error.message || 'সোশ্যাল সাইন ইন করা যায়নি।')
        setSocialLoading(null)
      }
    } catch {
      toast.error('সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      setSocialLoading(null)
    }
  }

  return (
    <div
      className={`${hind.className} flex min-h-screen flex-col items-center justify-center bg-[#f0f5ef] px-4 py-6 text-[#1c2420]`}
    >
      <header className="mb-5 max-w-[400px] text-center">
        <h1 className="mb-1 text-2xl font-bold">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm leading-relaxed text-[#5e6a63]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      <main className="w-full max-w-[420px] rounded-2xl border border-[#dfe7df] bg-[#fafcfa] px-5 py-5 shadow-sm sm:px-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: রহিম উদ্দিন"
              className="h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
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
              className="h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="image"
              className="mb-1 block text-sm font-medium"
            >
              প্রোফাইল ছবির URL (ঐচ্ছিক)
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="আবার লিখুন"
              className="h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15"
            />

            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                পাসওয়ার্ড দুটি মিলছে না।
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || socialLoading !== null}
            className="h-11 w-full cursor-pointer rounded-lg bg-[#008b45] text-sm font-semibold text-white shadow-sm transition hover:bg-[#00763b] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? 'অ্যাকাউন্ট তৈরি হচ্ছে...'
              : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3 text-sm text-[#5e6a63]">
          <span className="h-px flex-1 bg-[#e3e8e3]" />
          অথবা
          <span className="h-px flex-1 bg-[#e3e8e3]" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            disabled={isLoading || socialLoading !== null}
            onClick={() => handleSocialSignIn('google')}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 text-sm font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 48 48"
              aria-hidden="true"
              className="size-4 shrink-0"
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
            {socialLoading === 'google'
              ? 'Google দিয়ে সংযোগ হচ্ছে...'
              : 'Google দিয়ে চালিয়ে যান'}
          </button>

          <button
            type="button"
            disabled={isLoading || socialLoading !== null}
            onClick={() => handleSocialSignIn('github')}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 text-sm font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="currentColor"
              className="size-4 shrink-0"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            {socialLoading === 'github'
              ? 'GitHub দিয়ে সংযোগ হচ্ছে...'
              : 'GitHub দিয়ে চালিয়ে যান'}
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-[#008b45] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </main>

      <Link
        href="/"
        className="mt-5 text-sm text-[#77817a] transition hover:text-[#008b45] hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  )
}

