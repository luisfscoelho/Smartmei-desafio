import User from '../infra/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
