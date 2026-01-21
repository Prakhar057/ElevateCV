import express from "express"
import protect from "../middlewares/authMiddleware.js";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter  = express.Router();

resumeRouter.post("/create", protect , createResume)
resumeRouter.delete("/delete/:resumeId", protect , deleteResume)
resumeRouter.get("/get/:resumeId",protect , getResumeById )
resumeRouter.get("/public/:resumeId",getPublicResumeById)
resumeRouter.put("/update", protect, upload.single("image"), updateResume);

export default resumeRouter