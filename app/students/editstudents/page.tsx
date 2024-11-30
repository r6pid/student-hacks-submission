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

export default function ViewStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/get-students');
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          alert('Failed to fetch students data');
        }
      } catch (error) {
        alert('Error fetching students data');
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" style={{ gridTemplateRows: "auto auto auto", height: '100vh' }}>
      <h1 className="text-5xl font-bold">Students List</h1>
      
      <table className="min-w-full border-collapse border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 p-2">ID</th>
            <th className="border border-slate-600 p-2">Personality</th>
            <th className="border border-slate-600 p-2">Best Friend ID</th>
            <th className="border border-slate-600 p-2">Eyesight Issues</th>
            <th className="border border-slate-600 p-2">Gender</th>
            <th className="border border-slate-600 p-2">Noisiness Level</th>
            <th className="border border-slate-600 p-2">GPA</th>
            <th className="border border-slate-600 p-2">Favorite Subject</th>
            <th className="border border-slate-600 p-2">Participation Level</th>
            <th className="border border-slate-600 p-2">Attendance Consistency</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-slate-700 p-2">{student.id}</td>
              <td className="border border-slate-700 p-2">{student.personality}</td>
              <td className="border border-slate-700 p-2">{student.bestFriendId}</td>
              <td className="border border-slate-700 p-2">{student.eyesightIssues ? 'Yes' : 'No'}</td>
              <td className="border border-slate-700 p-2">{student.gender}</td>
              <td className="border border-slate-700 p-2">{student.noisinessLevel}</td>
              <td className="border border-slate-700 p-2">{student.gpa}</td>
              <td className="border border-slate-700 p-2">{student.favoriteSubject}</td>
              <td className="border border-slate-700 p-2">{student.participationLevel}</td>
              <td className="border border-slate-700 p-2">{student.attendanceConsistency}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/students" className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base">Click here to go back</Link>
    </div>
  );
}