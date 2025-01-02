import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function AddBlog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const getUserInfoFromToken = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log('Decoded Token:', decodedToken); 
      return {
        userId: decodedToken.userId,
        name: decodedToken.name, // Assuming the token contains the user's name
      };
    }
    return null;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !subject) {
      setError('All fields are required');
      return;
    }

    const userInfo = getUserInfoFromToken();

    const id = userInfo.id;
    const name = userInfo.name;

    if (!userInfo || !userInfo.userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const blogData = {
        title,
        description,
        subject,
        userId: userInfo.userId, 
        name: userInfo.name,
      };

      console.log(blogData);

      const response = await axios.post('http://localhost:5000/add', blogData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
        },
      });

      console.log('Blog submitted:', response.data);

      setTitle('');
      setDescription('');
      setSubject('');
      setError('');

      navigate('/homepage/myblogs');
    } catch (err) {
      console.error('Error creating blog post:', err);
      setError('Error creating blog post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Create a New Blog</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 font-semibold">Blog Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the blog title"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-gray-700 font-semibold">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the blog subject"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-semibold">Blog Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a detailed description of your blog"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Blog
            </button>

            <button
              type="button"
              onClick={() => navigate('/homepage/myblogs')} 
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back to My Blogs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
