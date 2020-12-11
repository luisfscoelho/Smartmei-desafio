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

const users = <IUser[]>[];

const resolvers = {
  Query: {
    user: (_, args): IUser | undefined =>
      users.find(user => user.id === args.id),
  },
  Mutation: {
    createUser: (_, args): IUser => {
      const newUser = {
        id: String(Math.random()).substring(2),
        name: args.input.name,
        email: args.input.email,
        createdAt: new Date(),
        collection: [],
        lentBooks: [],
        borrowedBooks: [],
      };

      users.push(newUser);

      return newUser;
    },
    addBookToMyCollection: (_, args): IBook | undefined => {
      const user = users.find(_user => _user.id === args.loggedUserId);
      const id = String(Math.random()).substring(2);

      user?.collection.push({
        id,
        title: args.input.title,
        pages: args.input.pages,
        createdAt: new Date(),
      });

      return user?.collection.find(book => book.id === id);
    },
    lendBook: (_, args): IBookLoan => {
      const fromUser = users.find(user => user.id === args.loggedUserId);
      const toUser = users.find(user => user.id === args.input.toUserId);
      const book = fromUser?.collection.find(
        _book => _book.id === args.input.bookId,
      );

      const bookLoan = {
        id: String(Math.random()).substring(2),
        book,
        fromUser: fromUser?.id,
        toUser: toUser?.id,
        lentAt: new Date(),
        returnedAt: null,
      };

      fromUser?.lentBooks.push(bookLoan);
      toUser?.lentBooks.push(bookLoan);

      return bookLoan;
    },
    returnBook: (_, args): IBookLoan => {
      const fromUser = users.find(_user => _user.id === args.loggedUserId);
      const bookLoaned = fromUser?.lentBooks.find(
        book => book.id === args.bookId,
      );
      bookLoaned?.returnedAt = new Date();

      const toUser = users.find(_user => _user.id === bookLoaned?.toUser);
      const bookBorrowed = toUser?.borrowedBooks.find(
        book => book.id === args.bookId,
      );
      bookBorrowed?.returnedAt = new Date();

      return bookLoaned;
    },
  },
};

export default resolvers;
