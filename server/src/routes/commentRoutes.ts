import { Router } from "express";
import { createComment, deleteComment } from "../controllers/commentController";

const router = Router();

router.post("/create", createComment);
router.delete("/:id", deleteComment); // Add this route

export default router;