import { ApolloError } from 'apollo-server';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserByIdService from './ShowUserByIdService';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let showUserByIdService: ShowUserByIdService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserByIdService = new ShowUserByIdService(fakeUsersRepository);
  });

  it('should be able to show the user', async () => {
    const createdUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
    });

    const user = await showUserByIdService.execute({ id: createdUser.id });

    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('jhondoe@example.com');
  });

  it('should not be able to show a non-existing user', async () => {
    expect(
      showUserByIdService.execute({
        id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ApolloError);
  });
});
