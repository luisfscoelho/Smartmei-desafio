import { ApolloError } from 'apollo-server';
import FakeBookLoansRepository from '../repositories/fakes/FakeBookLoansRepository';
import ReturnBookService from './ReturnBookService';

describe('returnBook', () => {
  let fakeBookLoansRepository: FakeBookLoansRepository;
  let returnBookService: ReturnBookService;

  beforeEach(() => {
    fakeBookLoansRepository = new FakeBookLoansRepository();
    returnBookService = new ReturnBookService(fakeBookLoansRepository);
  });

  it('should be able to return a book', async () => {
    const loan = await fakeBookLoansRepository.create({
      bookId: 'book_id',
      fromUserId: 'from_id',
      toUserId: 'to_id',
    });

    const returnLoan = await returnBookService.execute({
      bookId: 'book_id',
      userId: 'from_id',
    })

    expect(returnLoan.id).toBe(loan.id);
    expect(returnLoan.fromUserId).toBe('from_id');
    expect(returnLoan.toUserId).toBe('to_id');
    expect(returnLoan.bookId).toBe('book_id');
    expect(returnLoan.returnedAt).toBeInstanceOf(Date);
  });

  it('should not be able to return a book loan that does not exist', async () => {
    await expect(returnBookService.execute({
      bookId: 'non_existing_book_id',
      userId: 'user_id'
    })).rejects.toBeInstanceOf(ApolloError);
  });
});
