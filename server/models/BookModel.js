import mongoose from "mongoose";
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  publish: {
    type: Date,
  },
});

export default mongoose.model("Books", BookSchema);
