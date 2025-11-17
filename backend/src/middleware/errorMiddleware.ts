import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export function errorMiddleware(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const code = error.code || 'INTERNAL_ERROR';

  console.error('Error:', {
    code,
    message,
    statusCode,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: error.stack,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: error.details || undefined,
    },
    timestamp: new Date().toISOString(),
  });
}

export function createError(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any
): ApiError {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
}
