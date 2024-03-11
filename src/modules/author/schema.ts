import { Type } from '@sinclair/typebox'
import { bookResponse } from '../book/schema';

export const createAuthorInput = Type.Object({
  firstname: Type.String({ maxLength: 255 }),
  lastname: Type.String({ maxLength: 255 })
});

export const authorResponse = Type.Object({
  id: Type.Number(),
  firstname: Type.String({ maxLength: 255 }),
  lastname: Type.String({ maxLength: 255 }),
  createdAt: Type.String(),
});

export const authorWithBookResponse = Type.Intersect([
  authorResponse,
  Type.Object({
    books: Type.Array(bookResponse),
  }),
]);

export const getAuthorInput = Type.Object({
  id: Type.Number()
});
