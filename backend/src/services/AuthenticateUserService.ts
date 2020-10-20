import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import User from '../models/User';

interface AuthenticationProps {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({email, password}: AuthenticationProps){ 
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {email}});

    if (!user) {
      throw new Error('Credenciais incorretas');
    }

    const authenticated = await compare(password, user.password);

    if(!user) {
      throw new Error('Credenciais incorretas');
    }

    return authenticated;
  }
} 

export default AuthenticateUserService;