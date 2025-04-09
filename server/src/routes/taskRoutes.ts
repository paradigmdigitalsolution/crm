import { Router } from "express";
import { createTask, getTask, getUserTasks, updateTaskStatus } from "../controllers/taskController";


const router = Router();

router.get("/", getTask);
router.post("/create", createTask)
router.patch("/:taskId/status", updateTaskStatus)
router.get("/user/:userId", getUserTasks);


export default router;