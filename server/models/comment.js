import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  blogId: {
    type: Number, 
    required: true,
  },
  comment:{
    type: String,
    required: true,
  }
}, { timestamps: true });  

// Create the Comments model from the schema
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
