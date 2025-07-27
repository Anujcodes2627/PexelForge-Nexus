// server/routes/documentRoutes.js
import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  uploadDocument,
  getProjectDocuments
} from '../controllers/documentController.js';

const router = express.Router();

router.post(
  '/upload/:projectId',
  verifyToken,
  upload.single('file'),
  uploadDocument
);

router.get('/:projectId', verifyToken, getProjectDocuments);

export default router;
