import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { AuthorResponse, AuthorWithBookResponse, CreateAuthorInput, GetAuthorInput } from './types';
import { AuthorService } from './service';
import { createFastifySchema } from '../../fastify/utils';
import { authorResponse, authorWithBookResponse, createAuthorInput, getAuthorInput } from './schema';
import { Type } from '@sinclair/typebox';

const authorController = async (fastify: FastifyInstance, _opts: RouteShorthandOptions) => {
  const authorService = new AuthorService()
  const AUTHOR_TAG = 'Author'

  const getAllAuthorsSchema = createFastifySchema({ response: Type.Array(authorResponse), tags: [AUTHOR_TAG] })
  fastify.get<{Reply: AuthorResponse[]}>('/all', getAllAuthorsSchema, async (request, reply) => {
    const authors = await authorService.getAll()
    const authorsResponse = authors.map(author => authorService.getAuthorResponseFromAuthor(author))
    reply.send(authorsResponse)
  });

  const getAuthorSchema = createFastifySchema({ params: getAuthorInput, response: authorResponse, tags: [AUTHOR_TAG] })
  fastify.get<{Params: GetAuthorInput, Reply: AuthorResponse}>('/:id', getAuthorSchema, async (request, reply) => {
    const id = request.params.id
    const author = await authorService.getById(id)
    const authorResponse = authorService.getAuthorResponseFromAuthor(author)
    reply.send(authorResponse)
  })

  const createAuthorSchema = createFastifySchema({ body: createAuthorInput, response: authorResponse, successStatus: 201, tags: [AUTHOR_TAG] })
  fastify.post<{Body: CreateAuthorInput, Reply: AuthorResponse}>('/', createAuthorSchema, async (request, reply) => {
    const authorData = request.body
    const author = await authorService.create(authorData)
    const authorResponse = authorService.getAuthorResponseFromAuthor(author)
    reply.status(201).send(authorResponse)
  });

  const booksResponse = createFastifySchema({ params: getAuthorInput, response: authorWithBookResponse, tags: [AUTHOR_TAG] })
  fastify.get<{Params: GetAuthorInput, Reply: AuthorWithBookResponse}>('/:id/books', booksResponse, async (request, reply) => {
    const id = request.params.id
    const authorWithBooks = await authorService.getById(id, true)
    const response = await authorService.getAuthorWithBookResponse(authorWithBooks)
    reply.send(response)
  });
}

export {
  authorController
}