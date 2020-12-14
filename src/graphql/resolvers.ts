import { container } from 'tsyringe';
import BookLoan from '../domain/infra/entities/BookLoan';

import CreateBookService from '../domain/services/CreateBookService'
import CreateUserService from '../domain/services/CreateUserService'
import LendBookService from '../domain/services/LendBookService'
import ReturnBookService from '../domain/services/ReturnBookService'
import ShowUserByIdService from '../domain/services/ShowUserByIdService'

interface IBook {
  id: string;
  title: string;
  pages: number;
  createdAt: Date;
}

interface IBookLoan {
  id: string;
  book: IBook;
  fromUser: string;
  toUser: string;
  lentAt: Date;
  returnedAt: Date | null;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  collection: IBook[];
  lentBooks: IBookLoan[];
  borrowedBooks: IBookLoan[];
}

interface ICreateUserArgs {
  input: {
    name: string;
    email: string;
  };
}

interface IAddBookToMyCollectionArgs {
  loggedUserId: string,
  input: {
    title: string;
    pages: number;
  };
}

interface ILendBookArgs {
  loggedUserId: string,
  input: {
    bookId: string;
    toUserId: string;
  };
}

interface IReturnBookArgs {
  loggedUserId: string;
  bookId: string;
}

const resolvers = {
  BookLoan: {
    fromUser(obj: BookLoan) {
      return obj.fromUserId
    },
    toUser(obj: BookLoan) {
      return obj.toUserId
    },
    lentAt(obj: BookLoan) {
      return obj.createdAt
    },
  },

  Query: {
  user: async (_: {}, args: { id: string }): Promise<IUser> => {
    const showUserById = container.resolve(ShowUserByIdService);

    const user = await showUserById.execute({ id: args.id });

    console.log('user: ', user)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      collection: user.collection,
      lentBooks: user.lentBooks,
      borrowedBooks: user.borrowedBooks,
    }
  }
  },

  Mutation: {
    createUser: async (_: {}, args: ICreateUserArgs): Promise<IUser> => {
      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute(args.input);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        collection: user.collection,
        lentBooks: user.lentBooks,
        borrowedBooks: user.borrowedBooks,
      };
    },

    addBookToMyCollection: async (_: {}, args: IAddBookToMyCollectionArgs): Promise<IBook> => {
      const createBook = container.resolve(CreateBookService);

      const book = await createBook.execute({
        userId: args.loggedUserId,
        pages: args.input.pages,
        title: args.input.title,
      });

      return book;
    },

    lendBook: async (_: {}, args: ILendBookArgs): Promise<IBookLoan> => {
      const lendBook = container.resolve(LendBookService);

      const bookLoan = await lendBook.execute({
        userId: args.loggedUserId,
        bookId: args.input.bookId,
        toUserId: args.input.toUserId,
      });

      return {
        id: bookLoan.id,
        book: bookLoan.book,
        fromUser: bookLoan.fromUserId,
        toUser: bookLoan.toUserId,
        lentAt: bookLoan.createdAt,
        returnedAt: bookLoan.returnedAt,
      };
    },

    returnBook: async (_: {}, args: IReturnBookArgs): Promise<IBookLoan> => {
      const returnBook = container.resolve(ReturnBookService);

      const bookLoan = await returnBook.execute({
        userId: args.loggedUserId,
        bookId: args.bookId,
      })

      return {
        id: bookLoan.id,
        book: bookLoan.book,
        fromUser: bookLoan.fromUserId,
        toUser: bookLoan.toUserId,
        lentAt: bookLoan.createdAt,
        returnedAt: bookLoan.returnedAt,
      };
    },
  },
};

export default resolvers;
