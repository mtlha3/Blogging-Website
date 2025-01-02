import express from 'express';
import Blog from '../models/blog.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//================================================================================================
//Token access function
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};


//================================================================================================
//post to database blog Route

router.post('/add', verifyToken, async (req, res) => {
  try {
    const { title, description, subject, userId, name } = req.body;

    const nextId = await Blog.incrementId();

    const newBlog = new Blog({
      title,
      description,
      subject,
      userId,
      name,
      Id: nextId,  
    });

    await newBlog.save();  
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating blog post', error: err });
  }
});


  //================================================================================================
//fetch all blog Route

  router.get('/all', async (req, res) => {
    try {
      const blogs = await Blog.find().select('title subject description name Id');
  
      if (!blogs.length) {
        return res.status(404).json({ message: 'No blogs found' });
      }
  
      res.status(200).json({ message: 'Blogs fetched successfully', blogs });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching blogs', error: err });
    }
  });
  
//================================================================================================
//fetch blog by userId Route

router.get('/userBlogs', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const blogs = await Blog.find({ userId }).select('title subject description name');

    if (blogs.length === 0) {
      return res.status(200).json({ message: 'No blogs found for this user', blogs: [] });
    }

    res.status(200).json({ message: 'User blogs fetched successfully', blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user blogs', error: err });
  }
});

//================================================================================================
//delete blog Route

router.delete('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting blog', error: err });
  }
});

//================================================================================================
//Update blog Route
router.put('/blogs/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, subject } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, description, subject },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating blog', error: err });
  }
});




export default router;
