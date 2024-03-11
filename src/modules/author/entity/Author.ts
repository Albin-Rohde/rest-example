import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

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
}
