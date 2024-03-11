import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { BookService } from './service';
import { createFastifySchema } from '../../fastify/utils';
import { BookResponse, CreateBookInput, GetBookByIdInput } from './types';
import { bookResponse, bookWithAuthorResponse, createBookInput, getBookByIdInput } from './schema';
import { Type } from '@sinclair/typebox';

const bookController = async (fastify: FastifyInstance, _opts: RouteShorthandOptions) => {
  const bookService = new BookService()
  const BOOK_TAG = 'Book'

  const getAllBooksSchema = createFastifySchema({ response: Type.Array(bookResponse), tags: [BOOK_TAG] })
  fastify.get<{Reply: BookResponse[]}>('/all', getAllBooksSchema, async (_request, reply) => {
    const books = await bookService.getAll()
    const bookResponses = books.map(bookService.getBookResponseFromBook)
    reply.send(bookResponses)
  });

  const getBookSchema = createFastifySchema({ params: getBookByIdInput, response: bookResponse, tags: [BOOK_TAG] })
  fastify.get<{Params: GetBookByIdInput, Reply: BookResponse}>('/:id', getBookSchema, async (request, reply) => {
    const id = request.params.id

    const book = await bookService.getById(id)
    const bookResponse = bookService.getBookResponseFromBook(book)
    reply.send(bookResponse)
  });

  const getBookDetailsSchema = createFastifySchema({ params: getBookByIdInput, response: bookWithAuthorResponse, tags: [BOOK_TAG] })
  fastify.get<{Params: GetBookByIdInput, Reply: BookResponse}>('/:id/details', getBookDetailsSchema, async (request, reply) => {
    const id = request.params.id

    const book = await bookService.getById(id, true)
    const bookResponse = await bookService.getBookResponseWithAuthor(book)
    reply.send(bookResponse)
  });

  const createBookSchema = createFastifySchema({ body: createBookInput, response: bookResponse, successStatus: 201, tags: [BOOK_TAG] })
  fastify.post<{Body: CreateBookInput, Reply: BookResponse}>('/', createBookSchema, async (request, reply) => {
    const bookData = request.body
    const book = await bookService.create(bookData)
    const bookResponse = bookService.getBookResponseFromBook(book)
    reply.code(201).send(bookResponse)
  });
}

export {
  bookController
}