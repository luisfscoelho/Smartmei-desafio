import { getRepository, Repository } from 'typeorm';

import IBookLoansRepository from '../../repositories/IBookLoansRepository'
import ICreateBookLoanDTO from '../../dtos/ICreateBookLoanDTO';
import IUpdateBookLoanDTO from '../../dtos/IUpdateBookLoanDTO';

import BookLoan from '../entities/BookLoan';

export default class BookLoansRepository implements IBookLoansRepository {
  private ormRepository: Repository<BookLoan>;

  constructor() {
    this.ormRepository = getRepository(BookLoan);
  }

  public async findLoanByBookId(bookId: string): Promise<BookLoan | undefined> {
    const bookLoan = await this.ormRepository.findOne({
      where: {
        bookId: bookId,
        returnedAt: null,
      }
    });

    return bookLoan;
  }

  public async create(loandata: ICreateBookLoanDTO): Promise<BookLoan> {
    const bookLoan = this.ormRepository.create(loandata);

    await this.ormRepository.save(bookLoan);

    return bookLoan;
  }

  public async update(loanData: IUpdateBookLoanDTO): Promise<BookLoan> {
    return this.ormRepository.save(loanData);
  }
}
