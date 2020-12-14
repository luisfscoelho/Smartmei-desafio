import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import User from './User';
import BookLoan from './BookLoan';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  pages: number;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, user => user.collection)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => BookLoan, bookLoan => bookLoan.book)
  loans: BookLoan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Book;
