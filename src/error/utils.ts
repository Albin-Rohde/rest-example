import { ErrorResponse404, ErrorResponse500 } from './types';
import { NotFoundError } from './errors';

type ErrorResponse = ErrorResponse500 | ErrorResponse404

export const buildErrorResponse = (err: Error): ErrorResponse => {
  if (err instanceof NotFoundError) {
    return {
      statusCode: 404,
      name: err.name,
      message: err.message,
    }
  }

  return {
    statusCode: 500,
    name: err.name,
    message: 'Something went wrong',
  }
}