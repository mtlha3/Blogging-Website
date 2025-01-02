import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import jwt_decode from 'jwt-decode';
import Footer from '../components/footer';
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({});
  const [activeBlogId, setActiveBlogId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all');
        setBlogs(response.data.blogs);
      } catch (err) {
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const token = sessionStorage.getItem('token');
  let userName = '';
  if (token) {
    try {
      const decodedToken = jwt_decode(token);
      userName = decodedToken.name;
    } catch (error) {
      console.error('Error decoding token', error);
    }
  }

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        await axios.post('http://localhost:5000/comments', {
          name: userName,
          blogId: activeBlogId,
          comment: newComment,
        });

        setComments((prevComments) => ({
          ...prevComments,
          [activeBlogId]: [
            ...(prevComments[activeBlogId] || []),
            {
              text: newComment,
              user: userName,
              isUser: true,
            },
          ],
        }));

        setNewComment('');
      } catch (err) {
        console.error('Error posting comment:', err);
        setError('Error posting comment');
      }
    }
  };

  const openCommentModal = async (blogId) => {
    setActiveBlogId(blogId);
    setIsCommenting(true);
  
    try {
      const response = await axios.get(`http://localhost:5000/comments/${blogId}`);
      
      const transformedComments = response.data.comments.map((comment) => ({
        text: comment.comment, 
        user: comment.name, 
        isUser: comment.name === userName, 
      }));
  
      setComments((prevComments) => ({
        ...prevComments,
        [blogId]: transformedComments,
      }));
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };
  
  const closeCommentModal = () => {
    setIsCommenting(false);
    setActiveBlogId(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCommentModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='mt-28 px-32'>
      

      {userName && (
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">Welcome, {userName}!</h2>
        </div>
      )} 
      <div className="blogs-container mt-8 ">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={index} className="blog-post border-b py-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-sm text-gray-600">Posted by: {blog.name}</p>
              <p className="text-md font-semibold">{blog.subject}</p>
              <p className="text-md">{blog.description}</p>

              <button
                onClick={() => openCommentModal(blog.Id)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Write Comment
              </button>
            </div>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </div>

      {/* Modal for commenting */}
      {isCommenting && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-1/3 max-h-96 flex flex-col relative">
            <button
              onClick={closeCommentModal}
              className="absolute top-2 right-2 text-red-600 text-xl font-bold"
            >
              &times;
            </button>

            <div className="comments-box flex-1 overflow-y-auto">
              {comments[activeBlogId] && comments[activeBlogId].length > 0 ? (
                comments[activeBlogId].map((comment, idx) => (
                  <div
                    key={idx}
                    className={`comment mt-2 p-2 rounded-md ${
                      comment.isUser ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'
                    }`}
                  >
                    <p className="font-semibold">{comment.user}:</p>
                    <p>{comment.text}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>

            <div className="comment-input mt-4 flex space-x-2">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
                rows="3"
                className="border border-gray-300 p-2 rounded-md w-full"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Home;
