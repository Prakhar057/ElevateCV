import express from "express"
import protect from "../middlewares/authMiddleware";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from "../controllers/resumeController";
import upload from "../configs/multer";

const resumeRouter  = express.Router();

resumeRouter.post("/create", protect , createResume)
resumeRouter.delete("/delete", protect , deleteResume)
resumeRouter.get("/get",protect , getResumeById )
resumeRouter.get("/public",getPublicResumeById)
resumeRouter.put("/update",upload.single('image') , protect,updateResume)