import { injectable, inject } from 'tsyringe';

import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userData: IRequest): Promise<User> {
    const user = await this.usersRepository.create(userData);

    return user;
  }
}

export default CreateUserService;
