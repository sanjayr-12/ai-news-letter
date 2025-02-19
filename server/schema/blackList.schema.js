import mongoose from "mongoose";

const blackList = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const blackModel = mongoose.model("blacklist", blackList)

export default blackModel