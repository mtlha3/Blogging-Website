import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Id: { 
      type: Number,
      unique: true, 
    },
  },
  {
    timestamps: true, 
  }
);

blogSchema.statics.incrementId = async function () {
  const lastBlog = await this.findOne().sort({ Id: -1 }); 
  const nextId = lastBlog ? lastBlog.Id + 1 : 1;
  return nextId;
};

blogSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const nextId = await this.constructor.incrementId(); 
      this.Id = nextId; 

      next();
    } catch (err) {
      next(err);
    }
  } else {
    next(); 
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
