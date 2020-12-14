import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';
import Book from './Book';

@Entity('bookLoans')
class BookLoan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  returnedAt: Date;

  @Column()
  fromUserId: string;

  @ManyToOne(() => User, user => user.lentBooks)
  @JoinColumn({ name: 'fromUserId' })
  fromUser: User;

  @Column()
  toUserId: string;

  @ManyToOne(() => User, user => user.borrowedBooks)
  @JoinColumn({ name: 'toUserId' })
  toUser: User;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, book => book.loans)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default BookLoan;
