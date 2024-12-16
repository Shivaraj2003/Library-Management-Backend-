 import express from "express";
import dotenv from 'dotenv';
import example from './src/routes/example.routes.js';
import homeRoutes from './src/routes/home.routes.js';
import cookieParser from 'cookie-parser';
import connectDB from "./src/config/db.js";
import userRoutes from './src/routes/user.routes.js';

dotenv.config();

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', './src/views'); 

const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.json());  // To parse JSON requests
app.use(cookieParser());  // To parse cookies

// Use user routes
app.use('/api/user', userRoutes);

app.use('/', homeRoutes);
app.use('/test', example);

app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})