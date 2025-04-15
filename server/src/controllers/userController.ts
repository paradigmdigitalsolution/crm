import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = "123456"; // Replace with a secure secret key

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: parseInt(userId), // Ensure userId is parsed as an integer
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; // Ensure the function exits after sending a response
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving user: ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, profilePictureUrl = "i1.jpg", teamName} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePictureUrl,
        teamName,
      },
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error: any) {
    res.status(500).json({ message: `Error creating user: ${error.message}` });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, profilePictureUrl, teamName, role } = req.body;

  try {
    if (req.user?.role !== "Admin") {
      res.status(403).json({ message: "Only Admin can create users" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        profilePictureUrl,
        teamName,
        role
      },
    });

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error: any) {
    res.status(500).json({ message: `Error registering user: ${error.message}` });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send JWT token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    // Include user object in the response
    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.userId,
        username: user.username,
        role: user.role,
        profilePictureUrl: user.profilePictureUrl,
        teamName: user.teamName,
      },
      token, // Optional: Include token in the response body if needed
    });
  } catch (error: any) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};

export const getCurrentUser = (req: Request, res: Response): void => {
  const token = req.cookies.token; // token from httpOnly cookie
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // JWT_SECRET already used in login
    res.status(200).json({ user: decoded }); // return decoded user info
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};