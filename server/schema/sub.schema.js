import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  email: String,
});

const subModel = mongoose.model("sub", subSchema);

export default subModel;
