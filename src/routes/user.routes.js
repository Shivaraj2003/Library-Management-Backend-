
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js'; // Adjust path as necessary

const router = express.Router();

// /signup route to render the signup form
router.get('/signup', (req, res) => {
  res.render('signup'); // Renders the signup.ejs page
});

// /signup route for user registration
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
//   if (!['reader', 'author'].includes(role)) {
//     return res.status(400).json({ message: 'Invalid role. Choose either "reader" or "author".' });
//   }

  try {
    // Check if the email is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    // const token = jwt.sign(
    //   { userId: newUser._id, role: newUser.role },
    //   'your_jwt_secret_key', // Replace with a secure key
    //   { expiresIn: '15d' } // Token valid for 15 days
    // );

    // // Set the token as a cookie
    // res.cookie('auth_token', token, { httpOnly: true, maxAge: 15 * 24 * 60 * 60 * 1000 });

    // Redirect to a success page or back to the form with a success message
   res.redirect('dashboard');
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a route to show the signup success message
router.get('/dashboard', (req, res) => {
  res.render('dashboard', { message: 'User registered successfully!' });
});

export default router;
