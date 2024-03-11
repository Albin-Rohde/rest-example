import { FastifyInstance } from 'fastify';
import { authorController } from '../modules/author/controller';



export const registerRoutes = (fastify: FastifyInstance) => {
  // Add controllers
  fastify.register(authorController, { prefix: '/author' });
}