import { NextFunction, Request, Response } from "express";

export function secondMiddleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  console.log('je suis dans le second middleware');
  next();
}
export function T1Middleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  console.log('T1');
  next();
}
export function T2Middleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  console.log('T2');
  next();
}
export function T3Middleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  console.log('T3');
  next();
}
export function T4Middleware(
  req: Request,
  response: Response,
  next: NextFunction
) {
  console.log('T4');
  next();
}
