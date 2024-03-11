import { TSchema } from '@sinclair/typebox';
import { FastifySchema, RouteShorthandOptions } from 'fastify';
import { errorResponse404, errorResponse500 } from '../error/schema';

interface ISchemaInput {
  tags: string[],
  params?: TSchema,
  query?: TSchema,
  body?: TSchema,
  response?: TSchema,
  successStatus?: number,
}

export const createFastifySchema = (input: ISchemaInput): RouteShorthandOptions => {
  const schema: FastifySchema = {
    tags: input.tags,
    response: {
      [input.successStatus || 200]: input.response,
      404: errorResponse404,
      500: errorResponse500,
    },
  };

  if (input.body) {
    schema.body = input.body;
  }
  if (input.params) {
    schema.params = input.params;
  }
  if (input.query) {
    schema.querystring = input.query;
  }

  return { schema };
}
