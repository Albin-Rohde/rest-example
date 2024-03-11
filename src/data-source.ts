import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Migration1709993402647 } from './migrations/1709993402647-migration';
import { Author } from './modules/author/entity/Author';

dotenv.config();

export const entities = [
  Author,
];

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
  migrations: [Migration1709993402647],
});
