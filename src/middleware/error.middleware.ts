import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors,
    });
  }

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    // Handle unique constraint violations
    if (err.code === 'P2002') {
      return res.status(400).json({
        message: `A ${err.meta?.target} with this value already exists`,
      });
    }

    // Handle record not found
    if (err.code === 'P2001') {
      return res.status(404).json({ message: 'Record not found' });
    }
  }

  // Handle other errors
  return res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
};