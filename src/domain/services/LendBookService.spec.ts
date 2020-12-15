import { ApolloError } from 'apollo-server';
import FakeBookLoansRepository from '../repositories/fakes/FakeBookLoansRepository';
import LendBookService from './LendBookService';

describe('LentBook', () => {
  let fakeBookLoansRepository: FakeBookLoansRepository;
  let lendBookService: LendBookService;

  beforeEach(() => {
    fakeBookLoansRepository = new FakeBookLoansRepository();
    lendBookService = new LendBookService(fakeBookLoansRepository);
  });

  it('should be able to lend a book', async () => {
    const loan = await lendBookService.execute({
      bookId: 'book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    });

    expect(loan).toHaveProperty('id');
    expect(loan.fromUserId).toBe('user_id');
    expect(loan.toUserId).toBe('to_id');
    expect(loan.bookId).toBe('book_id');
  });

  it('should not be able to lend a book that was borrowed', async () => {
    await lendBookService.execute({
      bookId: 'book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    });

    await expect(lendBookService.execute({
      bookId: 'book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    })).rejects.toBeInstanceOf(ApolloError);
  });

  it('should not be able to lend a book that was borrowed', async () => {
    await lendBookService.execute({
      bookId: 'book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    });

    await expect(lendBookService.execute({
      bookId: 'book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    })).rejects.toBeInstanceOf(ApolloError);
  });

  it('should not be able to lend a book that does not exist', async () => {
    await expect(lendBookService.execute({
      bookId: 'non_existing_book_id',
      toUserId: 'to_id',
      userId: 'user_id',
    })).rejects.toBeInstanceOf(ApolloError);
  });
});
