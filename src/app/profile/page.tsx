
'use client'

import { authClient } from '@/lib/auth-client'
import { useEffect, useState, type FormEvent } from 'react'

const DEFAULT_AVATAR =
  'https://img.daisyui.com/images/profile/demo/spiderperson@192.webp'

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setImageUrl(user.image || '')
    }
  }, [user])

  const handleUpdateProfile = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setMessage('')
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('আপনার নাম লিখুন।')
      return
    }

    if (imageUrl.trim()) {
      try {
        const parsedUrl = new URL(imageUrl.trim())

        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
          setErrorMessage('সঠিক প্রোফাইল ইমেজ URL দিন।')
          return
        }
      } catch {
        setErrorMessage('সঠিক প্রোফাইল ইমেজ URL দিন।')
        return
      }
    }

    setIsSaving(true)

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      })

      if (result.error) {
        setErrorMessage(
          result.error.message || 'প্রোফাইল আপডেট করা যায়নি।',
        )
      } else {
        setMessage('আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে।')
        setIsEditing(false)
      }
    } catch {
      setErrorMessage('কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setName(user?.name || '')
    setImageUrl(user?.image || '')
    setMessage('')
    setErrorMessage('')
    setIsEditing(false)
  }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-violet-50">
        <span className="loading loading-spinner loading-lg text-blue-500" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-violet-50 p-6">
        <div className="w-full max-w-md rounded-3xl border border-white bg-white/90 p-10 text-center shadow-xl shadow-blue-100/60">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            আপনি সাইন ইন করেননি
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <a
            href="/sign-in"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            সাইন ইন করুন
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-violet-50 px-4 py-12 sm:px-6 lg:py-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Account Dashboard
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং আপডেট করুন
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500" />

          <div className="px-6 py-9 sm:px-10 sm:py-12">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-gradient-to-br from-sky-400 to-violet-500 p-1 shadow-lg shadow-blue-200">
                <div className="rounded-full bg-white p-1">
                  <div className="avatar">
                    <div className="w-24 rounded-full sm:w-28">
                      <img
                        src={user.image || DEFAULT_AVATAR}
                        alt="Profile Avatar"
                        onError={(event) => {
                          event.currentTarget.onerror = null
                          event.currentTarget.src = DEFAULT_AVATAR
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="mt-5 max-w-full break-words text-2xl font-bold text-slate-800">
                {user.name}
              </h2>

              <p className="mt-2 max-w-full break-all text-sm text-slate-500">
                {user.email}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Account Active
              </span>
            </div>

            {message && (
              <div
                role="status"
                className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                {message}
              </div>
            )}

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-4 transition-colors hover:bg-sky-50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M20 21a8 8 0 0 0-16 0" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    পূর্ণ নাম
                  </p>
                  <p className="mt-1 break-words font-semibold text-slate-800">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-4 transition-colors hover:bg-violet-50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    ইমেইল ঠিকানা
                  </p>
                  <p className="mt-1 break-all font-semibold text-slate-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 transition-colors hover:bg-indigo-50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-500">
                    ইউজার ID
                  </p>
                  <p className="mt-1 break-all font-mono text-sm font-medium text-slate-700">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setName(user.name || '')
                  setImageUrl(user.image || '')
                  setMessage('')
                  setErrorMessage('')
                  setIsEditing(true)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:from-blue-700 hover:to-violet-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L9 17l-4 1 1-4Z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-800">
                    Edit Profile
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    আপনার নাম অথবা প্রোফাইল ছবির URL পরিবর্তন করুন।
                  </p>
                </div>

                <form
                  onSubmit={handleUpdateProfile}
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      আপনার নাম
                    </label>

                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                      required
                      maxLength={100}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="profile-image"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      প্রোফাইল ছবির URL
                    </label>

                    <input
                      id="profile-image"
                      type="url"
                      value={imageUrl}
                      onChange={(event) => setImageUrl(event.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      খালি রাখলে ডিফল্ট avatar ব্যবহার হবে।
                    </p>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:from-blue-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSaving ? (
                        <>
                          <span className="loading loading-spinner loading-sm" />
                          আপডেট হচ্ছে...
                        </>
                      ) : (
                        'Update Profile'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 p-4 text-center">
              <p className="text-sm leading-6 text-slate-600">
                আপনার অ্যাকাউন্টের তথ্য এখানে নিরাপদে দেখতে পারবেন।
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Profile Dashboard · Powered by Better Auth
        </p>
      </div>
    </main>
  )
}

export default ProfilePage

