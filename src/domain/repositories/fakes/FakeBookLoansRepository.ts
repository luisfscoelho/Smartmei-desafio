import { uuid } from 'uuidv4';

import IBookLoansRepository from '../IBookLoansRepository';
import ICreateBookLoanDTO from '../../dtos/ICreateBookLoanDTO';
import IUpdateBookLoanDTO from '../../dtos/IUpdateBookLoanDTO';

import BookLoan from '../../infra/entities/BookLoan';

export default class FakeBookLoansRepository implements IBookLoansRepository {
  private bookLoans: BookLoan[] = [];

  public async findLoanByBookId(bookId: string): Promise<BookLoan | undefined> {
    const bookLoan = this.bookLoans.find(
      loan => loan.bookId === bookId && loan.returnedAt === null
    );

    return bookLoan;
  }

  public async create(loandata: ICreateBookLoanDTO): Promise<BookLoan> {
    const bookLoan = new BookLoan;

    Object.assign(bookLoan, { id: uuid() }, loandata);

    return bookLoan;
  }

  public async update(loanData: IUpdateBookLoanDTO): Promise<BookLoan> {
    const findIndex = this.bookLoans.findIndex(
      findBookLoan => findBookLoan.id === loanData.id
    );

    this.bookLoans[findIndex] = Object.assign(this.bookLoans[findIndex], loanData);

    return this.bookLoans[findIndex];
  }
}
