import { Repository } from 'typeorm';
import { db } from '../../data-source';
import { NotFoundError, ValidationError } from '../../error/errors';
import { Book } from './entity/Book';
import { BookResponse, BookWithAuthorResponse, CreateBookInput, GetBookByIdInput } from './types';
import { Author } from '../author/entity/Author';
import { AuthorService } from '../author/service';

export class BookService {
  constructor(
    private readonly bookRepository: Repository<Book> = db.getRepository(Book),
    private readonly authorService = new AuthorService(),
  ) {}

  public async create(bookData: CreateBookInput): Promise<Book> {
    const existingBook = await this.bookRepository.findOne({ where: { title: bookData.title } })

    if (existingBook) {
      throw new ValidationError(
        'Book with that title already exist.',
      );
    }
    await this.authorService.getById(bookData.authorId)

    const book = new Book();
    book.title = bookData.title;
    book.authorId = bookData.authorId;
    return this.bookRepository.save(book);
  }

  public async getById(id: GetBookByIdInput['id'], withAuthor = false): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: withAuthor ? ['author'] : [] })
    if (!book) {
      throw new NotFoundError('No book found with that id.')
    }
    return book
  }

  public async getAll(withAuthor = false): Promise<Book[]> {
    return this.bookRepository.find({ relations: withAuthor ? ['author'] : [] })
  }

  public getBookResponseFromBook(book: Book): BookResponse {
    return {
      id: book.id,
      title: book.title,
      createdAt: book.createdAt.toISOString()
    };
  }

  public async getBookResponseWithAuthor(book: Book & {author: Author}): Promise<BookWithAuthorResponse> {
    return {
      ...this.getBookResponseFromBook(book),
      author: {
        id: book.author.id,
        firstname: book.author.firstname,
        lastname: book.author.lastname
      }
    }
  }
}
