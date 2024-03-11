import { AuthorService } from '../service';
import { db } from '../../../data-source';
import { ValidationError } from '../../../error/errors';
import { AuthorFactory } from '../../../test-utils/factories';

describe('AuthorService', () => {
  let authorService: AuthorService;

  beforeAll(async () => {
    authorService = new AuthorService();
  });

  describe('createAuthor', () => {

    it('Should create author', async () => {
      const newAuthor = await authorService.create({
        firstname: 'berit',
        lastname: 'beritsson',
      });

      const author = await db.createQueryBuilder()
        .select('author')
        .from('author', 'author')
        .where('author.id = :id', { id: newAuthor.id })
        .getOne();
      expect(author).toBeDefined();
      expect(author?.id).toBeDefined();
      expect(author?.firstname).toEqual('berit');
      expect(author?.lastname).toEqual('beritsson');
    });

    it('Throws validation error on duplicate name', async () => {
      await authorService.create({
        firstname: 'berit',
        lastname: 'beritsson',
      });

      await expect(
        authorService.create({
          firstname: 'berit',
          lastname: 'beritsson',
        })
      ).rejects.toThrowError(ValidationError);
    });
  });

  describe('getById', () => {
    it('Should get author by id', async () => {
      const author = await new AuthorFactory().create();
      const authorFromService = await authorService.getById(author.id);

      expect(authorFromService).toBeDefined();
      expect(authorFromService.id).toEqual(author.id);
      expect(authorFromService.firstname).toEqual(author.firstname);
      expect(authorFromService.lastname).toEqual(author.lastname);
    });
  });

  describe('getAll', () => {
    it('Should get all authors in db', async () => {
      await new AuthorFactory().createMany(20);
      const authorsFromService = await authorService.getAll();

      expect(authorsFromService).toBeDefined();
      expect(authorsFromService).toHaveLength(20);
    });
  });
});
