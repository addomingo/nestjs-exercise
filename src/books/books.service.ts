import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, Genre } from './books.interface';
import { BookDuplicateException, DuplicateAuthorBookReferenceException, InvalidBookGenreException, NonExistentAuthorBookReferenceException } from './books.exception';
import { BooksDatabaseService } from './books-database.service';
import { AuthorsDatabaseService } from 'src/authors/authors-database.service';

@Injectable()
export class BooksService {

  constructor(
    private readonly booksDbService: BooksDatabaseService, // inject CRUD service
    private readonly authorsDbService: AuthorsDatabaseService
  ) {}

  createBook(createBookDto: CreateBookDto): Book {
    const books = this.booksDbService.findAll();
    const existingBook = books.find(book => createBookDto.name === book.name);
    if (existingBook) throw new BookDuplicateException();

    for (const id of createBookDto.authorIds) {
      try {
        this.authorsDbService.findOne(id);
      } catch (err) {
        throw new BadRequestException(`Author with ID ${id} does not exist`);
      }
    }

    return this.booksDbService.create(createBookDto);
  }

  findAllBooks(): Book[] {
    return this.booksDbService.findAll();
  }

  findBook(id: number): Book {
    return this.booksDbService.findOne(id);
  }

  updateBook(id: number, updateBookDto: UpdateBookDto): Book {
    return this.booksDbService.update(id, updateBookDto);
  }

  removeBook(id: number) {
    return this.booksDbService.remove(id);
  }

  // This action returns all books of a single author
  findBooksByAuthor(authorId: number): Book[] {
    try {
      const author = this.authorsDbService.findOne(authorId);
    } catch (err) {
      throw new BadRequestException(`Author with ID ${authorId} does not exist`);
    }

    const books = this.findAllBooks();
    const authorBooks = books.filter((book) => book.authorIds.includes(authorId));
    return authorBooks;
  }

  // This action returns all books that belongs to a specific genre
  findBooksByGenre(genre: string) {
    const isValidGenre = Object.values(Genre).includes(genre as Genre);
    if (!isValidGenre) {
      throw new InvalidBookGenreException(genre);
    }

    const books = this.findAllBooks();
    const genreBooks = books.filter((book) => book.genre.includes(genre as Genre));
    return genreBooks;
  }

  // This adds a reference of a specific author to a specific book
  addAuthorToBook(authorId: number, bookId: number) {
    // const author = this.authorsService.findOne(authorId);
    this.authorsDbService.findOne(authorId);
    const book = this.findBook(bookId);

    if (book.authorIds.includes(authorId)) {
      throw new DuplicateAuthorBookReferenceException(authorId, bookId);
    }

    book.authorIds.push(authorId);
  }

  // This removes a reference of a specific author to a specific book
  removeAuthorFromBook(authorId: number, bookId: number) {
    this.authorsDbService.findOne(authorId);
    const book = this.findBook(bookId);

    const authorIndex = book.authorIds.indexOf(authorId);
    if (authorIndex === -1) {
      throw new NonExistentAuthorBookReferenceException(authorId, bookId);
    }

    book.authorIds.splice(authorIndex, 1);
  }
}
