import { ApolloError } from 'apollo-server';
import { injectable, inject } from 'tsyringe';

import BookLoan from '../infra/entities/BookLoan';
import IBookLoansRepository from '../repositories/IBookLoansRepository';

interface IRequest {
  userId: string;
  bookId: string;
  toUserId: string;
}

@injectable()
class LendBookService {
  constructor(
    @inject('BookLoansRepository')
    private bookLoansRepository: IBookLoansRepository,
  ) {}

  public async execute({ userId, bookId, toUserId }: IRequest): Promise<BookLoan> {
    const isBorrowed = await this.bookLoansRepository.findLoanByBookId(bookId);

    if(isBorrowed) {
      throw new ApolloError('Book was alredy lent', 'BOOKWASLENT');
    }

    const bookLoan = await this.bookLoansRepository.create({
      fromUserId: userId,
      bookId,
      toUserId,
    });

    return bookLoan;
  }
}

export default LendBookService;
