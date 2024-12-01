'use client';

import { useState } from 'react';
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
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Partial<Student>>({
    id: 0,
    personality: '',
    bestFriendId: 0,
    eyesightIssues: false,
    gender: '',
    noisinessLevel: 0,
    gpa: 0,
    favoriteSubject: '',
    participationLevel: 0,
    attendanceConsistency: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks for all fields
    if (students.some(student => student.id === formData.id)) {
      alert('Student ID already exists!');
      return;
    }

    if (formData.id === formData.bestFriendId) {
      alert('Best Friend ID cannot be the same as the ID.');
      return;
    }

    try {
      const response = await fetch('/api/save-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Student data saved successfully!');
        setStudents([...students, formData as Student]);
        setFormData({
          id: 0,
          personality: '',
          bestFriendId: 0,
          eyesightIssues: false,
          gender: '',
          noisinessLevel: 0,
          gpa: 0,
          favoriteSubject: '',
          participationLevel: 0,
          attendanceConsistency: 0,
        });
      } else {
        alert('Failed to save student data');
      }
    } catch (error) {
      alert('Error saving student data');
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid bg-black flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-5xl font-bold" style={{ color: 'white' }}>Create Student</h1>
      <h2 className="text-3xl" style={{ color: 'white' }}>Students are already added in. You can delete and edit the list as you wish.</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>ID:</label>
          <input type="number" name="id" value={formData.id || ''} onChange={handleChange} placeholder="(1-100)" required min="1" max="100" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Personality:</label>
          <select
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            required
            style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }}
          >
            <option value="">Select...</option>
            <option value="Introvert">Introvert</option>
            <option value="Extrovert">Extrovert</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Best Friend ID:</label>
          <input type="number" name="bestFriendId" value={formData.bestFriendId || ''} onChange={handleChange} placeholder="(1-100)" required min="1" max="100" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Eyesight Issues:</label>
          <input type="checkbox" name="eyesightIssues" checked={formData.eyesightIssues || false} onChange={handleChange} style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }}
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Noisiness Level:</label>
          <input type="number" name="noisinessLevel" value={formData.noisinessLevel || ''} onChange={handleChange} placeholder="(0-10)" required min="0" max="10" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>GPA:</label>
          <input type="number" step="0.1" name="gpa" value={formData.gpa || ''} onChange={handleChange} placeholder="(0-5)" required min="0" max="5" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Favorite Subject:</label>
          <input type="text" name="favoriteSubject" value={formData.favoriteSubject || ''} onChange={handleChange} placeholder="Type Here" required style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Participation Level:</label>
          <input type="number" name="participationLevel" value={formData.participationLevel || ''} onChange={handleChange} placeholder="(0-100)" required min="0" max="100" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ width: '150px', color: 'white' }}>Attendance Consistency:</label>
          <input type="number" name="attendanceConsistency" value={formData.attendanceConsistency || ''} onChange={handleChange} placeholder="(0-10)" required min="0" max="10" style={{ width: '400px', padding: '10px 20px', margin: '0', color: 'black' }} />
        </div>
        
        <button type="submit" className="bg-green-600 hover:bg-green-400 text-white px-4 py-2 rounded mx-auto block" >Add Student</button>
      </form>
      <Link href="/students/editstudents" className="items-center gap-5 self-start rounded-lg bg-blue-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">View Students</Link>
      <Link href="/" className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base">Click here to go back</Link>
    </div>
  )
}
