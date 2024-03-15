import { FastifyInstance } from 'fastify';
import { authorController } from '../modules/author/controller';
import { bookController } from '../modules/book/controller';


export const registerRoutes = (fastify: FastifyInstance) => {
  // Add controllers
  fastify.register(authorController, { prefix: '/author' });
  fastify.register(bookController, { prefix: '/book' });
}