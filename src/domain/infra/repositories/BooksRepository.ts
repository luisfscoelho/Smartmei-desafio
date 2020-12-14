import { getRepository, Repository } from 'typeorm';

import IBooksRepository from '../../repositories/IBooksRepository'
import ICreateBookDTO from '../../dtos/ICreateBookDTO';

import Book from '../entities/Book';

export default class BooksRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async create(bookData: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create(bookData);

    await this.ormRepository.save(book);

    return book;
  }
}
