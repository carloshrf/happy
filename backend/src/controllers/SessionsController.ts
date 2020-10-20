import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default {
  async create(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const authenticated = await authenticateUser.execute({email, password});

      return response.json(authenticated);
    } catch(err) {
      return response.json({error: err.message});
    }
  }
}