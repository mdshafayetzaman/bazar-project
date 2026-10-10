
const Loading = () => {
  return (
    <main className="min-h-screen bg-base-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center justify-center text-center">
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
            <div className="absolute inset-0 animate-ping rounded-3xl bg-primary/10" />
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-base-content">
            লোড হচ্ছে...
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-base-content/60">
            আপনার জন্য সর্বশেষ পণ্যের তথ্য প্রস্তুত করা হচ্ছে।
            অনুগ্রহ করে একটু অপেক্ষা করুন।
          </p>

          <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-base-300">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="skeleton h-48 w-full rounded-none" />

              <div className="space-y-4 p-4">
                <div className="skeleton h-4 w-3/4" />
                <div className="skeleton h-3 w-1/2" />

                <div className="flex items-center justify-between pt-2">
                  <div className="skeleton h-6 w-20" />
                  <div className="skeleton h-9 w-9 rounded-xl" />
                </div>

                <div className="skeleton h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-base-content/40">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span>দ্রুত লোড করার চেষ্টা চলছে</span>
        </div>
      </div>
    </main>
  )
}

export default Loading
