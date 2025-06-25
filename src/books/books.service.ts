import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, Genre } from './books.interface';
import { BookDuplicateException, DuplicateAuthorBookReferenceException, InvalidBookGenreException, NonExistentAuthorBookReferenceException } from './books.exception';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];
  private currId = 1;

  constructor(private readonly authorsService: AuthorsService) {} // inject AuthorsService

  // This action adds a new Book
  create(createBookDto: CreateBookDto): Book {
    const existingBook = this.books.find(book => createBookDto.name === book.name);
    if (existingBook) {
      throw new BookDuplicateException();
    }

    for (const id of createBookDto.authorIds) {
      try {
        this.authorsService.findOne(id);
      } catch (err) {
        throw new BadRequestException(`Author with ID ${id} does not exist`);
      }
    }

    const newBook: Book = {
      id: this.currId,
      ...createBookDto
    };
    this.currId++; // update id count
    return newBook;
  }

  // This action returns all Books
  findAll(): Book[] {
    return this.books;
  }

  // This action returns a single Book
  findOne(id: number): Book {
    const Book = this.books.find(book => id === book.id);
    if (!Book) {
      throw new Error('Book not found');
    }
    return Book;
  }

  // This action updates a single Book
  update(id: number, updateBookDto: UpdateBookDto): Book {
    const Book = this.findOne(id);
    Object.assign(Book, updateBookDto); // assign properties of updateBookDto to the Book object in the array
    return Book;
  }

  // This action deletes a single Book
  remove(id: number) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    this.books.splice(index, 1);
    return 'Book deleted'
  }

  
  // This action returns all books of a single author
  findAuthorsBooks(authorId: number): Book[] {
    try {
      const author = this.authorsService.findOne(authorId);
    } catch (err) {
      throw new BadRequestException(`Author with ID ${authorId} does not exist`);
    }

    const books = this.books.filter((book) => book.authorIds.includes(authorId));
    return books;
  }

  // This action returns all books that belongs to a specific genre
  findGenreBooks(genre: string) {
    const isValidGenre = Object.values(Genre).includes(genre as Genre);
    if (!isValidGenre) {
      throw new InvalidBookGenreException(genre);
    }

    const books = this.books.filter((book) => book.genre.includes(genre as Genre));
    return books;
  }

  // This adds a reference of a specific author to a specific book
  addAuthorToBook(authorId: number, bookId: number) {
    // const author = this.authorsService.findOne(authorId);
    this.authorsService.findOne(authorId);
    const book = this.findOne(bookId);

    if (book.authorIds.includes(authorId)) {
      throw new DuplicateAuthorBookReferenceException(authorId, bookId);
    }

    book.authorIds.push(authorId);
  }

  // This removes a reference of a specific author to a specific book
  removeAuthorFromBook(authorId: number, bookId: number) {
    this.authorsService.findOne(authorId);
    const book = this.findOne(bookId);

    const authorIndex = book.authorIds.indexOf(authorId);
    if (authorIndex === -1) {
      throw new NonExistentAuthorBookReferenceException(authorId, bookId);
    }

    book.authorIds.splice(authorIndex, 1);
  }
}
