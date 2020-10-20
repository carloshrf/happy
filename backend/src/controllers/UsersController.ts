import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';
import CreateUserService from '../services/CreateUserService';

export default { 
  async create(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const createUser = new CreateUserService();
      const user = await createUser.execute({name, email, password});

      return response.status(201).json(user);
    } catch(err) {
      return response.json({error: err.message});
    }
  },

  async list(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find({
      relations: ['orphanage']
    });

    const authenticate = new AuthenticateUserService();

    authenticate.execute({email: 'a@b.com', password: '123'});

    return response.json(users);
  }
}