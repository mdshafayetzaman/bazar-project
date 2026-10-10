'use client'

import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const DEFAULT_AVATAR =
  'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user
  const [isOpen, setIsOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const avatarSrc = !avatarError && user?.image ? user.image : DEFAULT_AVATAR

  const handleSignOut = async () => {
    await authClient.signOut()
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    setAvatarError(false)
  }, [user?.image])

  if (isPending) {
    return (
      <nav className="flex shrink-0 items-center gap-3">
        <div className="size-10 animate-pulse rounded-full bg-gray-200" />
      </nav>
    )
  }

  return (
    <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
      {user ? (
        <Link className="relative" href="/profile">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="ইউজার মেনু"
            className="flex items-center gap-2 rounded-full p-1 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-green-600"
          >
            <div className="size-10 overflow-hidden rounded-full ring-2 ring-green-500 ring-offset-2 sm:size-11">
              <img
                alt={user.name || 'User Avatar'}
                src={avatarSrc}
                onError={() => setAvatarError(true)}
                className="size-full object-cover"
              />
            </div>

            <span className="hidden max-w-32 text-left sm:block">
              <span className="block truncate text-sm font-semibold text-gray-800">
                {user.name || 'ব্যবহারকারী'}
              </span>
              <span className="block text-xs text-gray-500">
                আমার অ্যাকাউন্ট
              </span>
            </span>

            <svg
              className={`hidden size-4 text-gray-500 transition-transform sm:block ${isOpen ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-72 origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10">
              <div className="border-b border-gray-100 bg-gradient-to-br from-green-50 to-white p-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-green-500 ring-offset-2">
                    <img
                      src={avatarSrc}
                      alt={user.name || 'User Avatar'}
                      onError={() => setAvatarError(true)}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name || 'ব্যবহারকারী'}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>
                  </span>

                  <span className="flex-1">আমার প্রোফাইল</span>

                  <svg
                    className="size-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-red-100 text-red-600">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 17l5-5-5-5" />
                      <path d="M15 12H3" />
                      <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                    </svg>
                  </span>
                  সাইন আউট
                </button>
              </div>

              <div className="border-t border-gray-100 px-4 py-3">
                <p className="text-center text-xs text-gray-400">
                  আপনার অ্যাকাউন্ট নিরাপদ রাখুন
                </p>
              </div>
            </div>
          )}
        </Link>
      ) : (
        <>
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
        </>
      )}
    </nav>
  )
}

export default UserInfo
