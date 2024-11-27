import Link from 'next/link' 

export default function Page() {
  return (
    <div 
      className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" 
      style={{ gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))", height: '100vh' }}
    >
      <h1 className="text-5xl font-bold"> Students </h1>
      <Link 
        href="/"
        className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
      >
        Click here to go back
      </Link>
    </div>
  )
}
