'use client';

import { useState } from 'react';
import Link from 'next/link' 

export default function Page() {
  const [colors, setColors] = useState(Array(100).fill('lightgray'));
  return (
    <div 
      className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" 
      style={{ gridTemplateRows: "auto auto auto", height: '100vh' }}
    >
      <h1 className="text-5xl font-bold"> Seating Chart Randomizer </h1>
      <div className="grid grid-cols-10 gap-4"> 
        {colors.map((color, i) => ( 
          <div 
            key={i} 
            className="w-12 h-12 border border-black cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => { 
              const newColors = [...colors]; 
              newColors[i] = newColors[i] === 'green' ? 'lightgray' : 'green'; 
              setColors(newColors); 
            }}
          >
          </div> 
        ))}
      </div> 
      <Link 
        href="/"
        className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
      >
        Click here to go back
      </Link>
    </div>
  )
}
