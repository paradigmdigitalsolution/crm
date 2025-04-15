import { Router } from "express";
import { getUser, getUsers, postUser, registerUser, loginUser, getCurrentUser } from "../controllers/userController";
import { authenticateJWT, authorizeAdmin } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.post("/register", authenticateJWT, authorizeAdmin, registerUser,); // User registration
router.post("/login", loginUser); // User login
router.get("/me", getCurrentUser);
// Protected routes
router.get("/", getUsers); // Get all users (protected)
router.post("/", authenticateJWT, postUser); // Create a user (protected)
router.get("/:userId", authenticateJWT, getUser); // Get a specific user (protected)

export default router;