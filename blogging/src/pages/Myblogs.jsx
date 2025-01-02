import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
function Myblogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [currentBlog, setCurrentBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/userBlogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBlogs(response.data.blogs);
      } catch (err) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleAddBlog = () => {
    navigate('/addblog');
  };

  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDeleteBlog = async (id) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError('Error deleting blog');
    }
  };

  const handleUpdateBlog = async (updatedBlog) => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/blogs/${updatedBlog._id}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog)));
      setIsEditModalOpen(false);
    } catch (err) {
      setError('Error updating blog');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='px-32'>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddBlog}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Add Blog
        </button>
      </div>

      <div className="blogs-container mt-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-post border-b py-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-600">Posted by: {blog.name}</p>
              <p className="text-md font-semibold">{blog.subject}</p>
              <p className="text-md">{blog.description}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditBlog(blog)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold">Edit Blog</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBlog(currentBlog);
              }}
              className="mt-4"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={currentBlog.title}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Subject</label>
                <input
                  type="text"
                  value={currentBlog.subject}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={currentBlog.description}
                  onChange={(e) =>
                    setCurrentBlog({ ...currentBlog, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Myblogs;
