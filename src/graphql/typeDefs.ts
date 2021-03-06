import { gql } from 'apollo-server';

const typeDefs = gql`
  scalar IsoDate

  type Query {
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: IsoDate!
    collection: [Book]
    lentBooks: [BookLoan]
    borrowedBooks: [BookLoan]
  }

  type Book {
    id: ID!
    title: String!
    pages: Int!
    createdAt: IsoDate!
  }

  type BookLoan {
    id: ID!
    book: Book!
    fromUser: ID!
    toUser: ID!
    lentAt: IsoDate!
    returnedAt: IsoDate
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    addBookToMyCollection(loggedUserId: ID!, input: AddBookInput!): Book!
    lendBook(loggedUserId: ID!, input: LendBookInput!): BookLoan!
    returnBook(loggedUserId: ID!, bookId: ID!): BookLoan!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input AddBookInput {
    title: String!
    pages: Int!
  }

  input LendBookInput {
    bookId: ID!
    toUserId: ID!
  }
`;

export default typeDefs;
