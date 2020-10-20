import { hash } from 'bcrypt';
import User from '../models/User';
import { getRepository } from 'typeorm';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

class CreateUserService { 
  public async execute({name, email, password}: UserProps): Promise<User> {
    const usersRepository = getRepository(User);

    const findByEmail = await usersRepository.findOne({where: {email}});
    if (findByEmail) {
      throw new Error('Já há um usuário cadastrado com este endereço de e-mail');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name, email, password: hashedPassword
    });

    await usersRepository.save(user);
    
    return user;
  }
}

export default CreateUserService;