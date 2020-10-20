import { NextFunction, Request, Response } from 'express';
import authConfig from '../config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Não foi possível localizar o token JWT');
  }

  const [, token] = authHeader.split(' ');

  try {
    const authenticated = verify(token, authConfig.jwt.secret);

    const { sub } = authenticated as TokenPayload;

    request.user = {
      id: Number(sub)
    }

    return next();
  } catch (err) {
    throw new Error('Token JWT inválido ' + err.message);
  }
}