'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Student {
  id: number;
  personality: string;
  bestFriendId: number;
  eyesightIssues: boolean;
  gender: string;
  noisinessLevel: number;
  gpa: number;
  favoriteSubject: string;
  participationLevel: number;
  attendanceConsistency: number;
}

export default function Page() {
  const [seatingChart, setChart] = useState<Student[]>([]);
  const [colors, setColors] = useState(Array(100).fill('lightgray'));
  const [greenSquares, setGreenSquares] = useState([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [output, setOutput] = useState('');

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

  const makeChart = async () => {
    const response = await fetch('/api/run-java', {
        method: 'POST'
    });
    const data = await response.json();
    if (data.error) {
        console.error(data.error);
    } else {
        setOutput(data.output);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/get-students');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } 
        else {
          alert('Failed to fetch students data');
        }
      } 
      catch (error) {
        alert('Error fetching students data');
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  const createSeatingChart = async () => {
    if (greenSquares.length != students.length) {
      alert("Number of seats needs to equal number of students!")
    }
    makeChart();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold">Seating Chart Randomizer</h1>
      <div className="grid grid-cols-10 gap-4"> 
        {colors.map((color, i) => ( 
          <div 
            key={i} 
            className="w-12 h-12 border border-black cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => handleSquareClick(i)}
          />
        ))}
      </div>
      <button
        className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded mx-auto block"
        onClick={() => createSeatingChart()}
      >
        Generate
      </button>
      <div className="flex justify-center w-full">
        <Link 
          href="/"
          className="items-center gap-5 rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
          style={{ marginBottom: '20px' }}
        >
          Click here to go back
        </Link>
      </div>
    </div>
  );
}
