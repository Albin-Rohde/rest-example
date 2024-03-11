import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { AuthorResponse, CreateAuthorInput, GetAuthorInput } from './types';
import { AuthorService } from './service';
import { createFastifySchema } from '../../fastify/utils';
import { authorResponse, createAuthorInput, getAuthorInput } from './schema';
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
}

export {
  authorController
}