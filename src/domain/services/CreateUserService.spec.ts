import { ApolloError } from 'apollo-server';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUser: CreateUserService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(ApolloError);
  });
});
