import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadFile = () => {
  const [file, setFile] = useState(null); // Faylni saqlash
  const [subjectName, setSubjectName] = useState(''); // Foydalanuvchi kiritgan fan nomi
  const [message, setMessage] = useState(''); // Xabarni saqlash
  const navigate = useNavigate();

  const url = axios.create({
    baseURL: 'https://sinfbackend2.onrender.com',
    withCredentials: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Token topilmasa, login sahifasiga yo'naltirish
    }
  }, [navigate]);

  // Fayl tanlanganida
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !file) {
      setMessage('Iltimos, fan nomini kiriting va faylni tanlang!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Faylni FormData ga qo'shamiz
    formData.append('subjectName', subjectName); // Foydalanuvchi kiritgan fan nomini qo'shamiz

    try {
      const token = localStorage.getItem('token'); // Tokenni localStorage'dan olamiz

      const response = await url.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Fayl yuborilishi kerak bo'lgan format
          Authorization: `Bearer ${token}`, // Tokenni yuborish
        },
      });
console.log(response)

      setMessage('Fayl muvaffaqiyatli yuklandi!');
    } catch (error) {
      console.error('Faylni yuklashda xato:', error);
      setMessage('Faylni yuklashda xato yuz berdi!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Fan Nomini Kiriting va Fayl Yuklash</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="subjectName" className="mb-1 text-gray-600">Fan Nomi:</label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fan nomini kiriting"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="file" className="mb-1 text-gray-600">Faylni Yuklang:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Yuklash
        </button>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default UploadFile;
