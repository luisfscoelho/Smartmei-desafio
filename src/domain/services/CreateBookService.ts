import { injectable, inject } from 'tsyringe';

import Book from '../infra/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

interface IRequest {
  userId: string;
  title: string;
  pages: number;
}

@injectable()
class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ userId, title, pages }: IRequest): Promise<Book> {
    const book = await this.booksRepository.create({
      ownerId: userId,
      title,
      pages,
    });

    return book;
  }
}

export default CreateBookService;
