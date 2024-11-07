import Link from 'next/link' 

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-30 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold"> Classroom Randomizer </h1>
      <Link 
        href="/"
        className="items-center gap-5 self-start rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-400 md:text-base"
      >
        Click here to go back
      </Link>
    </div>
  )
}
