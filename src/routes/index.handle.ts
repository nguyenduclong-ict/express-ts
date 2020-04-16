import { Request, Response, NextFunction } from 'express';

export async function handleSayHello(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json({
    message: 'Server worked!',
  });
}
