import BookLoan from '../infra/entities/BookLoan';

import ICreateBookLoanDTO from '../dtos/ICreateBookLoanDTO';
import IUpdateBookLoanDTO from '../dtos/IUpdateBookLoanDTO';

export default interface IBookLoansRepository {
  findLoanByBookId(bookId: string): Promise<BookLoan | undefined>;
  create(data: ICreateBookLoanDTO): Promise<BookLoan>;
  update(data: IUpdateBookLoanDTO): Promise<BookLoan>;
}
