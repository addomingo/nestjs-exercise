import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/interfaces/dto/create-book.dto';
import { UpdateBookDto } from 'src/interfaces/dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.booksService.findBook(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.updateBook(id, updateBookDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.booksService.removeBook(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get('author/:authorId')
  findAuthorsBooks(@Param('authorId', ParseIntPipe) authorId: number) {
    return this.booksService.findBooksByAuthor(authorId);
  }

  @Get('genre/:genre')
  findGenreBooks(genre: string) {
    return this.booksService.findBooksByGenre(genre);
  }

  @Patch(':bookId/add-author/:authorId')
  addAuthorToBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('authorId', ParseIntPipe) authorId: number,
  ) {
    return this.booksService.addAuthorToBook(authorId, bookId);
  }

  @Patch(':bookId/remove-author/:authorId')
  removeAuthorToBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('authorId', ParseIntPipe) authorId: number,
  ) {
    return this.booksService.removeAuthorFromBook(authorId, bookId);
  }
}
