import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address.']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long.']
  },
  role: {
    type: String,
    required: true,
    enum: ['reader', 'author'], // Role can be either reader or author
  },
  borrowedBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', // Reference to a Book model
    },
  ],
  booksWritten: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', // Reference to a Book model
    },
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;