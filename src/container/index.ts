import { container } from 'tsyringe';

import IUsersRepository from '../domain/repositories/IUsersRepository';
import UsersRepository from '../domain/infra/repositories/UsersRepository';

import IBooksRepository from '../domain/repositories/IBooksRepository';
import BooksRepository from '../domain/infra/repositories/BooksRepository';

import IBookLoansRepository from '../domain/repositories/IBookLoansRepository';
import BookLoansRepository from '../domain/infra/repositories/BookLoansRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);

container.registerSingleton<IBookLoansRepository>(
  'BookLoansRepository',
  BookLoansRepository,
);
