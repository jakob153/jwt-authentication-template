import { Request, Response } from 'express';

export interface Context {
  req: Request;
  res: Response;
}

export interface DecodedRefreshToken {
  refreshToken?: string;
}

export interface DecodedEmailToken {
  emailToken?: string;
}