import { Author } from './entity/Author';
import { Repository } from 'typeorm';
import type { AuthorResponse, CreateAuthorInput, GetAuthorInput } from './types';
import { db } from '../../data-source';
import { NotFoundError, ValidationError } from '../../error/errors';

export class AuthorService {
  constructor(private readonly authorRepository: Repository<Author> = db.getRepository(Author)) {
  }

  public async create(authorData: CreateAuthorInput): Promise<Author> {
    const existingAuthor = await this.authorRepository.findOne({ where: { firstname: authorData.firstname.toLowerCase(), lastname: authorData.lastname } })
    if (existingAuthor) {
      throw new ValidationError(
        'Author with that name already exist.',
      );
    }
    const author = new Author();
    author.firstname = authorData.firstname.toLowerCase();
    author.lastname = authorData.lastname.toLowerCase();
    return this.authorRepository.save(author);
  }

  public async getById(id: GetAuthorInput['id']): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } })
    if (!author) {
      throw new NotFoundError('No author found with that id.')
    }
    return author
  }

  public async getAll(): Promise<Author[]> {
    return this.authorRepository.find()
  }

  public getAuthorResponseFromAuthor(author: Author): AuthorResponse {
    return {
      id: author.id,
      firstname: author.firstname,
      lastname: author.lastname,
      createdAt: author.createdAt.toISOString()
    };
  }
}
