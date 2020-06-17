import { MiddlewareFn } from 'type-graphql';
import jwt from 'jsonwebtoken';
import { Context } from '../types';
import { AuthenticationError } from 'apollo-server-express';

const secret = process.env.SECRET as string;

export const verifyAuthToken: MiddlewareFn<Context> = async (
  { context },
  next
) => {
  try {
    if (!context.req.headers['authorization']) {
      throw new AuthenticationError('Not Authenticated');
    }

    const authToken = context.req.headers['authorization'].split('Bearer ')[1];
    jwt.verify(authToken, secret);

    return next();
  } catch (error) {
    throw error;
  }
};