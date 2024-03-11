import type { Static } from '@sinclair/typebox';
import { bookWithAuthorResponse, bookResponse, createBookInput, getBookByIdInput } from './schema';

export type CreateBookInput = Static<typeof createBookInput>
export type BookResponse = Static<typeof bookResponse>
export type BookWithAuthorResponse = Static<typeof bookWithAuthorResponse>
export type GetBookByIdInput = Static<typeof getBookByIdInput>
