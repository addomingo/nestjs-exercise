import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from '../interfaces/dto/create-author.dto';
import { UpdateAuthorDto } from '../interfaces/dto/update-author.dto';
import { BooksService } from 'src/books/books.service';
import { AuthorHasExistingBooksException } from './authors.exception';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAllAuthors();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.authorsService.findAuthor(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    try {
      return this.authorsService.updateAuthor(id, updateAuthorDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.removeAuthor(id);
  }
}
