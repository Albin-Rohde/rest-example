import { Type } from '@sinclair/typebox';

export const errorResponse500 = Type.Object({
  statusCode: Type.Number({ default: 500 }),
  name: Type.String({ default: 'UnknownInternalError' }),
  message: Type.String({ default: 'Something went wrong, try again later' }),
});

export const errorResponse404 = Type.Object({
  statusCode: Type.Number({ default: 404 }),
  name: Type.String({ default: 'NotFoundError' }),
  message: Type.String({ default: 'Could not find requested data' }),
});