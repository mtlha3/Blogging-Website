import express from 'express';
import Comment from '../models/comment.js' 

const router = express.Router();


router.post('/comments', async (req, res) => {
  try {
    const { name, blogId, comment } = req.body;

    if (!name || !blogId || !comment) {
      return res.status(400).json({ message: 'Name, blogId, and comment are required.' });
    }

    const newComment = new Comment({
      name,
      blogId,
      comment,
    });

    await newComment.save();

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error posting comment',
      error: err.message,
    });
  }
});

//================================================================================================
router.get('/comments/:blogId', async (req, res) => {
    try {
      const { blogId } = req.params;
  
      // Fetch comments for the specific blogId
      const comments = await Comment.find({ blogId });
  
      if (comments.length === 0) {
        return res.status(404).json({ message: 'No comments found for this blog.' });
      }
  
      res.status(200).json({
        message: 'Comments fetched successfully',
        comments,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: 'Error fetching comments',
        error: err.message,
      });
    }
  });
  

export default router;
