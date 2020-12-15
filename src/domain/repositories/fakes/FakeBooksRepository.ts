import { uuid } from 'uuidv4';

import IBooksRepository from '../IBooksRepository';
import ICreateBookDTO from '../../dtos/ICreateBookDTO';

import Book from '../../infra/entities/Book';

export default class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  public async create(bookData: ICreateBookDTO): Promise<Book> {
    const book = new Book;

    Object.assign(book, { id: uuid() }, bookData);

    this.books.push(book);

    return book;
  }
}
