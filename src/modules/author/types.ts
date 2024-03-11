import type { Static } from '@sinclair/typebox';
import { authorResponse, createAuthorInput, getAuthorInput } from './schema';

export type CreateAuthorInput = Static<typeof createAuthorInput>
export type AuthorResponse = Static<typeof authorResponse>
export type GetAuthorInput = Static<typeof getAuthorInput>