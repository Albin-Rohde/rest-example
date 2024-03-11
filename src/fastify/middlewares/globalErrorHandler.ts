import { FastifyReply, FastifyRequest } from 'fastify';
import { buildErrorResponse } from '../../error/utils';

export const errorHandler = (err: Error, req: FastifyRequest, reply: FastifyReply) => {
  const errorResponse = buildErrorResponse(err);

  return reply.status(errorResponse.statusCode).send(errorResponse)
}
