import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, Genre } from './books.interface';
import { BookDuplicateException } from './books.exception';
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
    const Book = this.books.find(Book => id === Book.id);
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
    const index = this.books.findIndex((Book) => Book.id === id);
    if (index === -1) {
      throw new Error('Book not found');
    }
    this.books.splice(index, 1);
    return 'Book deleted'
  }

  
  // This action returns all books of a single author
  findAuthorsBooks(id: number) {

  }

  // This action returns all books that belongs to a specific genre
  findGenreBooks(genre: Genre) {

  }
}
