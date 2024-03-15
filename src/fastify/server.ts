import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { registerRoutes } from './routes';
import { errorHandler } from './middlewares/globalErrorHandler';

export const startServer = async () => {
  const server = fastify().withTypeProvider<TypeBoxTypeProvider>()
  await server.register(swagger)
  await server.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
  server.setErrorHandler(errorHandler)

  registerRoutes(server);

  console.log('starting....')
  await server.listen({
    port: 5000,
  });
  console.log('Started on port 5000')
}
