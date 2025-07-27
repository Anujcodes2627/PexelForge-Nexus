
import express from 'express';
import {
  loginUser,
  registerUser,
  getCurrentUser,
  updatePassword
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getAllDevelopers } from '../controllers/authController.js';

const router = express.Router();

// Admin registers new users
router.post('/register', verifyToken, registerUser);

// Login route
router.post('/login', loginUser);

// Get current user info
router.get('/me', verifyToken, getCurrentUser);
router.get('/developers', verifyToken, getAllDevelopers);
router.put('/update-password', verifyToken, updatePassword);

export default router;
