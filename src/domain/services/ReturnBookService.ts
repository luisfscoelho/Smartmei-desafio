import { injectable, inject } from 'tsyringe';
import { ApolloError } from 'apollo-server'

import BookLoan from '../infra/entities/BookLoan';
import IBookLoansRepository from '../repositories/IBookLoansRepository';

interface IRequest {
  userId: string;
  bookId: string;
}

@injectable()
class ReturnBookService {
  constructor(
    @inject('BookLoansRepository')
    private lentBooksRepository: IBookLoansRepository,
  ) {}

  public async execute({ userId, bookId }: IRequest): Promise<BookLoan> {
    const bookLoan = await this.lentBooksRepository.findLoanByBookId(bookId);

    if(bookLoan === undefined){
      throw new ApolloError('lending not found', 'NOT FOUND')
    }

    bookLoan.returnedAt = new Date();

    const savedlentBook = await this.lentBooksRepository.update(bookLoan);

    return savedlentBook;
  }
}

export default ReturnBookService;
