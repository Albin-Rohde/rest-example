import { Type } from '@sinclair/typebox'

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

export const getAuthorInput = Type.Object({
  id: Type.Number()
});
