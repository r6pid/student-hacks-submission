'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link' 

export default function Page() {
  const [seatingChart, setChart] = useState<Student[]>([]);
  
  const [colors, setColors] = useState(Array(100).fill('lightgray'));
  const [greenSquares, setGreenSquares] = useState([]);

  const handleSquareClick = (index) => {
    const newColors = colors.map((color, i) =>
      i === index ? (color === 'green' ? 'lightgray' : 'green') : color
    );
    setColors(newColors);

    const updatedGreenSquares = newColors
      .map((color, i) => (color === 'green' ? i : null))
      .filter((i) => i !== null);

    setGreenSquares(updatedGreenSquares);
  };

  useEffect(() => {
    const fetchSeatingChart = async() => {
      try {
        const response = await fetch('/api/create-seating-chart');
        if (response.ok) {
          const data = await response.json();
          setChart(data);
        }
        else {
          alert('Failed to fetch seating chart');
        }
      }
      catch(error) {
        alert('Error fetching seating chart');
        console.error('Error:', error);
      }
    };

    fetchSeatingChart();
  }, []);

  const createSeatingChart = async () => {
    
  }

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
            onClick={() => handleSquareClick(i)}
          >
          </div> 
        ))}
      </div> 
      <button
        className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded mx-auto block"
        onClick={() => createSeatingChart()}
      >
        Generate
      </button>
      <Link 
        href="/"
        className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
      >
        Click here to go back
      </Link>
    </div>
  )
}
