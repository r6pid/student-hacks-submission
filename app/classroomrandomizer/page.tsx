'use client'

import { useRouter } from 'next/navigation'  // Usage: App router

export default function Page() {
  const router = useRouter()

  return (
    <div>
      <h1> Classroom Randomizer </h1>
      <button 
        onClick={() => router.back()}
        color="primary"
        background-color="#FFF"
      >
        Click here to go back
      </button>
    </div>
  )
}
