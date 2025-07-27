import express from "express";
import {
  createProject,
  getAllProjects,
  markProjectComplete,
  assignDevelopersToProject,
  activateProject,deleteProject
} from "../controllers/projectController.js";
import { getMyProjects } from "../controllers/projectController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, createProject);
router.get("/all", verifyToken, getAllProjects);
router.put("/complete/:id", verifyToken, markProjectComplete);
router.put("/assign/:id", verifyToken, assignDevelopersToProject);
router.put('/activate/:id', verifyToken, activateProject);
router.delete('/:id',verifyToken, deleteProject);


router.get('/my', verifyToken, getMyProjects);

export default router;
