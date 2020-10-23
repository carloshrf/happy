import { Request, Response } from 'express';
import User from '../models/User';
import { getRepository } from 'typeorm';
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
      relations: ['orphanages']
    });

    console.log(request.user.id);

    return response.json(users);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id, {
      relations: ['orphanages']
    });

    return response.json(user);
  }
}