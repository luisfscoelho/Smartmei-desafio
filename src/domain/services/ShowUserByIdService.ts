import { injectable, inject } from 'tsyringe';
import { ApolloError } from 'apollo-server'

import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string
}

@injectable()
class ShowUserByIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if(user === undefined){
      throw new ApolloError('user not found', 'NOT FOUND')
    }

    return user;
  }
}

export default ShowUserByIdService;
