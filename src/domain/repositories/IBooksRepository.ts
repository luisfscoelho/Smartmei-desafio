import Book from '../infra/entities/Book';

import ICreateBookDTO from '../dtos/ICreateBookDTO';

export default interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
}
