import type { Static } from '@sinclair/typebox';
import { errorResponse404, errorResponse500 } from './schema';

export type ErrorResponse500 = Static<typeof errorResponse500>
export type ErrorResponse404 = Static<typeof errorResponse404>