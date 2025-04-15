import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createComment = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { text, taskId, userId, } = req.body;
    try {
        const newComment = await prisma.comment.create({
            data: {
                text,
                taskId,
                userId,
            }

        });
        res.status(201).json(newComment);
    } catch (error: any) {
        res.status(500).json({ message: `Error creating Comment ${error.message}` });
    }    
}

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.body; // Pass the userId from the frontend

  try {
    // Fetch the comment to check ownership
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
       res.status(404).json({ message: "Comment not found" });
       return;
    }

    // Check if the comment belongs to the user
    if (comment.userId !== userId) {
       res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting comment: ${error.message}` });
  }
};