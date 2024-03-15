# Fastify

### Why Fastify
Primary reason for choosing fastify is the way it automatically integrates with swagger.
This means that we will get a swagger docs page out of the box with Fastify-swagger plugin.

### Swagger
![Screenshot_20240311_134907.png](assets%2FScreenshot_20240311_134907.png)

---

### Fastify implementation
Our implementation for fastify resides in `/src/fastify`
#### Files
- server.ts - init fastify server
- utils.ts - some fastify specific helper functions
- routes.ts - register application endpoints/routing
- middlewares/* - middlewares to run before/after/on error for endpoints
#### createFastifySchema
This helper function helps us create a swagger compatible fastify schema on the fly by utilising the TypeBox
validators we already have in this project.
```typescript
export const createFastifySchema = (input: ISchemaInput): RouteShorthandOptions => {
  return {
    schema: {
      tags: input.tags,
      body: input?.body || undefined,
      params: input?.params || undefined,
      querystring: input?.query || undefined,
      response: {
        [input.successStatus || 200]: input?.response || undefined,
        404: errorResponse404,
        500: errorResponse500,
      }
    },
  }
}
```
It simply takes optional
- boyd - i.e request.body
- params - url params
- querystring - url query string
- response - i.e what we return from endpoint

It then also construct the common interface we have for when the application errors.

#### globalErrorHandler
We are also defining a global error handler in fastify/middlewares/globalErrorHandler.ts
```typescript
export const errorHandler = (err: Error, req: FastifyRequest, reply: FastifyReply) => {
  const errorResponse = buildErrorResponse(err);

  return reply.status(errorResponse.statusCode).send(errorResponse)
}

```
This will ensure that we do not leak any stack trace and are reporting errors consistently across the applications

---

### Project structure
We are using our existing modules, e.g `Author` and add a `controller.ts` to it. This will be our routing for a author.
```typescript
const authorService = new AuthorService()
const AUTHOR_TAG = 'Author'
  
...
const getAuthorSchema = createFastifySchema({ params: getAuthorInput, response: authorResponse, tags: [AUTHOR_TAG] })
fastify.get<{Params: GetAuthorInput, Reply: AuthorResponse}>('/:id', getAuthorSchema, async (request, reply) => {
  const id = request.params.id

  const author = await authorService.getById(id)
  const authorResponse = authorService.getAuthorResponseFromAuthor(author)
  reply.send(authorResponse)
})

```
In this example we are creating our `AuthorService` to be available to all our endpoints.

When defining our endpoint we can use the types from TypeBox to type our endpoint, and the TypeBox 
validators as validators for our endpoint. We use the `createFastifySchema` to create the schema and validators
this saves us the time from repeating json structure in the same way for all endpoints.

### Endpoints
- GET /author/:id - Get Author by id
- GET /author/all - Get all Authors
- POST /author/ - Create Author
- GET /author/:id/books - All books by Author
- GET /book/:id - Get Book by id
- GET /book/:id/details - Get Book by id and the books author
- GET /book/all - Get all books