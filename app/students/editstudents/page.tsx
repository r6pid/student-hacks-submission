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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/delete-student', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert('Student deleted successfully');
        setStudents(students.filter(student => student.id !== id));
      } else {
        alert('Failed to delete student');
      }
    } catch (error) {
      alert('Error deleting student');
      console.error('Error:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch('/api/delete-all', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Students deleted successfully');
        setStudents([]);
      } else {
        alert('Failed to delete students');
      }
    } catch (error) {
      alert('Error deleting students');
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid bg-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" style={{ gridTemplateRows: "auto auto auto", height: '100vh' }}>
      <h1 className="text-5xl font-bold">Students List</h1>
      
      <table className="min-w-full border-collapse border border-slate-500" style = {{ border: "1px solid white", color: "white" }}>
        <thead>
          <tr>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>ID</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Personality</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Best Friend ID</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Eyesight Issues</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Gender</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Noisiness Level</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>GPA</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Favorite Subject</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Participation Level</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Attendance Consistency</th>
            <th className="border border-slate-600 p-2" style = {{ border: "1px solid white", color: "white" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.id}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.personality}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.bestFriendId}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.eyesightIssues ? 'Yes' : 'No'}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.gender}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.noisinessLevel}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.gpa}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.favoriteSubject}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.participationLevel}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>{student.attendanceConsistency}</td>
              <td className="border border-slate-700 p-2" style = {{ border: "1px solid white", color: "white" }}>
                <button
                  className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded mx-auto block"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded mx-auto block"
        onClick={() => handleDeleteAll()}
      >
        Delete All
      </button>
      <Link href="/students" className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base">Click here to go back</Link>
    </div>
  );
}
