import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Migration1709993402647 } from './migrations/1709993402647-migration';
import { Migration1710172745412 } from './migrations/1710172745412-migration';
import { Author } from './modules/author/entity/Author';
import { Book } from './modules/book/entity/Book';

dotenv.config();

export const entities = [
  Author,
  Book
];

export const migrations = [
  Migration1709993402647, Migration1710172745412
]

export const db = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: entities,
  subscribers: [],
  migrations: migrations,
});
