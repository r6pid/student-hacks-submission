'use client';

import { useState } from 'react'
import Link from 'next/link' 

interface Student {
  name: string;
  peopleTheyLike: string;
  hobbies: string;
  studyHabbits: string;
}

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({ name: '', peopleTheyLike: '', hobbies: '', studyHabbits: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) { 
      alert("Name is required!"); 
      return;
    }
    setStudents([...students, formData]);
    setFormData({ name: '', peopleTheyLike: '', hobbies: '', studyHabbits: ''});
  };  

  return (
    <div 
      className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-30 font-[family-name:var(--font-geist-sans)]" 
      style={{ gridTemplateRows: "auto auto auto", height: '100vh' }}
    >
      <h1 className="text-5xl font-bold"> Students </h1>
      <form 
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Name" 
          style={{ 
            display: 'table-cell',
            padding: '10px 20px',
            height: '100px',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            border: '1px solid black', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px gray'
          }}
        />
        <input 
          type="text" 
          name="peopleTheyLike" 
          value={formData.peopleTheyLike} 
          onChange={handleChange} 
          placeholder="People They Like"
          style={{ 
            display: 'table-cell',
            padding: '10px 20px',
            height: '100px',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            border: '1px solid black', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px gray'
          }}
        />
        <input 
          type="text" 
          name="hobbies" 
          value={formData.hobbies} 
          onChange={handleChange} 
          placeholder="Hobbies" 
          style={{ 
            display: 'table-cell',
            padding: '10px 20px',
            height: '100px',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            border: '1px solid black', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px gray'
          }}
        />
        <input 
          type="text" 
          name="studyHabbits" 
          value={formData.studyHabbits} 
          onChange={handleChange} 
          placeholder="Study Habits" 
          style={{ 
            display: 'table-cell',
            padding: '10px 20px',
            height: '100px',
            fontSize: '16px',
            color: 'black',
            textAlign: 'center',
            border: '1px solid black', 
            borderRadius: '10px', 
            boxShadow: '0 0 10px gray'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
          <button 
            type="submit"
            style = {{
              width: '200px',
              height: '50px',
              backgroundColor: 'green',
              borderRadius: '10px'
            }}
          >
            Add Student
          </button>
        </div>
      </form>
      <ul 
        style={{ 
          listStyleType: 'none', 
          padding: '0', 
          width: '100%', 
          height: '200px', 
          overflowY: 'scroll', 
          border: '1px solid #ccc', 
          borderRadius: '5px', 
          boxShadow: '0 0 10px gray' 
        }}>

      {students.map((student, index) => {
        const fields = [ 
          { label: 'Name', value: student.name }, 
          { label: 'People They Like', value: student.peopleTheyLike }, 
          { label: 'Hobbies', value: student.hobbies }, 
          { label: 'Study Habits', value: student.studyHabbits } 
        ]; 

        const nonEmptyFields = fields.filter(field => field.value.trim() !== '');

        return (
          <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0', textAlign: 'center', backgroundColor: 'white', color: 'black' }}>
            {nonEmptyFields.map((field, fieldIndex) => (
              <span key={fieldIndex}>
                <strong>{field.label}:</strong> {field.value}{fieldIndex < nonEmptyFields.length - 1 ? ', ' : ''}
              </span>
            ))}
          </li>
        );
      })}

      </ul>
      <Link 
        href="/"
        className="items-center gap-5 self-start rounded-lg bg-red-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
      >
        Click here to go back
      </Link>
    </div>
  )
}
