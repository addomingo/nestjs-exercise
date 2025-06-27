import { Injectable } from '@nestjs/common';
import { Book } from 'src/interfaces/book';
import { CreateBookDto } from 'src/interfaces/dto/create-book.dto';
import { UpdateBookDto } from 'src/interfaces/dto/update-book.dto';

/**
 * This service's sole purpose is to provide CRUD operations that directly communicate with in-memory books data.
 */
@Injectable()
export class BooksDatabaseService {
  private readonly books: Book[] = [];
  private currId = 1;

  // This action adds a new Book
  create(createBookDto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.currId,
      ...createBookDto
    };

    this.currId++; // update id count
    this.books.push(newBook);
    return newBook;
  }

  // This action returns all Books
  findAll(): Book[] {
    return this.books;
  }

  // This action returns a single Book
  findOne(id: number): Book {
    const book = this.books.find(book => id === book.id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
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
}
