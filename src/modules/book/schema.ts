import { Type } from '@sinclair/typebox'

export const createBookInput = Type.Object({
  title: Type.String({ maxLength: 255 }),
  authorId: Type.Number(),
});


export const bookResponse = Type.Object({
  id: Type.Number(),
  title: Type.String({ maxLength: 255 }),
  createdAt: Type.String(),
});

export const bookWithAuthorResponse = Type.Object({
  id: Type.Number(),
  title: Type.String({ maxLength: 255 }),
  author: Type.Object({
    id: Type.Number(),
    firstname: Type.String({ maxLength: 255 }),
    lastname: Type.String({ maxLength: 255 }),
  }),
  createdAt: Type.String(),
});

export const getBookByIdInput = Type.Object({
  id: Type.Number()
});

export const getBooksByAuthorIdInput = Type.Object({
  authorId: Type.Number()
});