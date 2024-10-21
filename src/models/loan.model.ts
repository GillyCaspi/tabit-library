import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  estimateReturnDate: { type: Number, required: true },
  returnDate: { type: Number, required: false },
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;


