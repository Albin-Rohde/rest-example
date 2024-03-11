import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';

export const registerSwaggerPlugin = async (server: FastifyInstance) => {
  await server.register(swagger)
  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: false,
      withCredentials: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
}
