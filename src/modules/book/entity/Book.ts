import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Author } from '../../author/entity/Author';

@Entity('book')
@Unique(['title'])
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @ManyToOne(_type => Author, author => author.books, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'author_id' })
  author!: Author

  @Column({ name: 'author_id' })
  authorId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
