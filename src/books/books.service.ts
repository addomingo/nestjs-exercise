import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './books.interface';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];
  private currId = 1;

  // This action adds a new Book
  create(createBookDto: CreateBookDto): Book {
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
}
