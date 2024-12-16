import express from 'express';
const router = express.Router();

// Route to render the home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to the Library' });
});

export default router;
