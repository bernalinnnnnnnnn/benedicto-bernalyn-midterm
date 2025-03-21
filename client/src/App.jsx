import { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [formData, setData] = useState({ lname: '', fname: '', course: '', year: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-lists');
      setStudents(response.data.lists);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/add-students', formData);
      fetchStudents();
      setData({ lname: '', fname: '', course: '', year: '' });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  // Delete student
  const handleDeleteStudent = async (student_id) => {
    try {
      await axios.post('http://localhost:3000/delete-student', { student_id });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-200 to-purple-400">
      <div className="w-2xl p-8 bg-white rounded-2xl shadow-2xl border-4 border-pink-400">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-6 drop-shadow-lg font-serif">
          Student Information Sytem
        </h1>

        <form onSubmit={handleAddStudent} className="mb-4 space-y-2">
          <input type="text"
            placeholder="Last Name"
            className="mt-1 p-3 border-2 border-pink-400 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-[\'Playfair Display\']"
            value={formData.lname}
            onChange={(e) =>
              setData({ ...formData, lname: e.target.value })} required />

          <input type="text"
            placeholder="First Name"
            className="mt-1 p-3 border-2 border-pink-400 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-[\'Playfair Display\']"
            value={formData.fname}
            onChange={(e) =>
              setData({ ...formData, fname: e.target.value })} required />

          <input type="text"
            placeholder="Course"
            className="mt-1 p-3 border-2 border-pink-400 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-[\'Playfair Display\']"
            value={formData.course} onChange={(e) =>
              setData({ ...formData, course: e.target.value })} required />

          <input type="number"
            placeholder="Year"
            className="mt-1 p-3 border-2 border-pink-400 rounded-xl w-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 font-[\'Playfair Display\']"
            value={formData.year} onChange={(e) =>
              setData({ ...formData, year: e.target.value })} required />

          <button type="submit"
            className="rounded-full bg-purple-500 border-4 border-pink-500 text-white hover:text-white shadow-2xl font-bold text-xl transition-transform transform hover:scale-110 px-4 py-2 w-full">
            Add Student</button>
        </form>

        <ul>
          {students.map((student) => (
            <li key={student.student_id}
              className="p-3 border-2 border-pink-400 rounded-xl w-full shadow-md font-[\'Playfair Display\']">
              {student.fname} {student.lname} - {student.course} ({student.year})
              <button className="px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition shadow-md ml-10" onClick={() => handleDeleteStudent(student.student_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
