import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import Book from './Book';
import BookLoan from './BookLoan'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Book, book => book.owner)
  collection: Book[];

  @OneToMany(() => BookLoan, bookLoan => bookLoan.fromUser)
  lentBooks: BookLoan[];

  @OneToMany(() => BookLoan, bookLoan => bookLoan.toUser)
  borrowedBooks: BookLoan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default User;
