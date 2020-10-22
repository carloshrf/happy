import { compare } from 'bcrypt';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import { sign } from 'jsonwebtoken';
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

    if(!authenticated) {
      throw new Error('Credenciais incorretas');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
} 

export default AuthenticateUserService;