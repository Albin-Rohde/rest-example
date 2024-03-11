import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Book } from '../../book/entity/Book';

@Entity('author')
@Unique(['firstname', 'lastname'])
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  firstname!: string;

  @Column({ length: 255 })
  lastname!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Book, book => book.author)
  books!: Book[];
}
