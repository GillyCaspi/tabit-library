import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  topic: { type: String, required: true },
  year: { type: Number, required: true },
  stars: { type: Number, required: true },
  available: { type: Boolean, required: false , default: true},
});

bookSchema.index({ year: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ topic: 1 });


const Book = mongoose.model("Book", bookSchema);

export default Book;