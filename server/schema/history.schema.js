import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  history: String,
});

const historyModel = mongoose.model("history", historySchema);

export default historyModel;
