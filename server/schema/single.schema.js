import mongoose from "mongoose";

const singleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
});

const singleModel = mongoose.model("single", singleSchema);

export default singleModel;
