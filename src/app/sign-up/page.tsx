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

function SignUpSkeleton() {
  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-[#dfe7df] bg-[#fafcfa] px-5 py-5 shadow-sm sm:px-6">
      <div className="skeleton mb-5 h-5 w-2/5 rounded-md" />

      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="mb-4">
          <div className="skeleton mb-2 h-4 w-1/4 rounded-md" />
          <div className="skeleton h-11 w-full rounded-lg" />
        </div>
      ))}

      <div className="skeleton h-11 w-full rounded-lg" />

      <div className="my-5 flex items-center gap-3">
        <div className="skeleton h-px flex-1" />
        <div className="skeleton h-4 w-12" />
        <div className="skeleton h-px flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="skeleton h-10 rounded-lg" />
        <div className="skeleton h-10 rounded-lg" />
      </div>

      <div className="skeleton mx-auto mt-5 h-4 w-3/4 rounded-md" />
    </div>
  )
}

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

    if (name.trim().length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে।')
      return
    }

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

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
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

  const inputClass =
    'h-11 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none transition placeholder:text-[#89928b] focus:border-[#008b45] focus:ring-2 focus:ring-[#008b45]/15 disabled:opacity-60'

  const isBusy = isLoading || socialLoading !== null

  return (
    <div
      className={`${hind.className} flex min-h-screen flex-col items-center justify-center bg-[#f0f5ef] px-4 py-6 text-[#1c2420]`}
    >
      <header className="mb-5 max-w-[400px] text-center">
        <h1 className="mb-1 text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm leading-relaxed text-[#5e6a63]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      {isLoading ? (
        <SignUpSkeleton />
      ) : (
        <main className="w-full max-w-[420px] rounded-2xl border border-[#dfe7df] bg-[#fafcfa] px-5 py-5 shadow-sm sm:px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                নাম
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: রহিম উদ্দিন"
                disabled={isBusy}
                className={inputClass}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
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
                disabled={isBusy}
                className={inputClass}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="mb-1 block text-sm font-medium">
                প্রোফাইল ছবির URL (ঐচ্ছিক)
              </label>
              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                disabled={isBusy}
                className={inputClass}
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
                disabled={isBusy}
                className={inputClass}
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
                disabled={isBusy}
                className={inputClass}
              />

              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  পাসওয়ার্ড দুটি মিলছে না।
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isBusy}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#008b45] text-sm font-semibold text-white shadow-sm transition hover:bg-[#00763b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
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
              disabled={isBusy}
              onClick={() => handleSocialSignIn('google')}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 text-sm font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === 'google' ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সংযোগ হচ্ছে...
                </>
              ) : (
                'Google দিয়ে চালিয়ে যান'
              )}
            </button>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleSocialSignIn('github')}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 text-sm font-medium transition hover:bg-[#f1f5f1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {socialLoading === 'github' ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  সংযোগ হচ্ছে...
                </>
              ) : (
                'GitHub দিয়ে চালিয়ে যান'
              )}
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
      )}

      <Link
        href="/"
        className="mt-5 text-sm text-[#77817a] transition hover:text-[#008b45] hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  )
}
