import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/interfaces/dto/create-book.dto';
import { UpdateBookDto } from 'src/interfaces/dto/update-book.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a book', 
    description: 'Creates and adds a book to the record.' 
  })
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all books', 
    description: 'Retrieves all books in the record.' 
  })
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get book', 
    description: 'Retrieves a single book based on its ID.' 
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.booksService.findBook(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update book', 
    description: 'Updates a single book based on its ID, new data will be based on the request body. All properties of the book can be updated except for its ID.' 
  })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.updateBook(id, updateBookDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete book', 
    description: 'Deletes a single book based on its ID.' 
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.booksService.removeBook(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get('author/:authorId')
  @ApiOperation({ 
    summary: 'Get all the books of an author', 
    description: 'Retrieves all books of an author based on its authorId.' 
  })
  findAuthorsBooks(@Param('authorId', ParseIntPipe) authorId: number) {
    return this.booksService.findBooksByAuthor(authorId);
  }

  @Get('genre/:genre')
  @ApiOperation({ 
    summary: 'Get all the books of a genre', 
    description: 'Retrieves all books belonging to a genre based on its genre list.' 
  })
  findGenreBooks(@Param('genre') genre: string) {
    return this.booksService.findBooksByGenre(genre);
  }

  @Patch(':bookId/add-author/:authorId')
  @ApiOperation({ 
    summary: 'Add an author to a book', 
    description: 'Adds a reference to an existing author into the specified book\'s authorIds list.' 
  })
  addAuthorToBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('authorId', ParseIntPipe) authorId: number,
  ) {
    return this.booksService.addAuthorToBook(authorId, bookId);
  }

  @Patch(':bookId/remove-author/:authorId')
  @ApiOperation({ 
    summary: 'Remove an author from a book', 
    description: 'Removes a reference to an existing author from the specified book\'s authorIds list.' 
  })
  removeAuthorToBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('authorId', ParseIntPipe) authorId: number,
  ) {
    return this.booksService.removeAuthorFromBook(authorId, bookId);
  }
}
