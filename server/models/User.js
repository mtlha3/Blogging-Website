

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Id: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.incrementId = async function () {
  const lastUser = await this.findOne().sort({ Id: -1 }); 
  const nextId = lastUser ? lastUser.Id + 1 : 1; 
  return nextId;
};

userSchema.pre("save", async function (next) {
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

const User = mongoose.model("User", userSchema);

export default User;
