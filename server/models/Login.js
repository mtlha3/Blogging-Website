import mongoose from 'mongoose';

const loginHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Id: {
      type: Number,
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const LoginHistory = mongoose.model('LoginHistory', loginHistorySchema);

export default LoginHistory;
