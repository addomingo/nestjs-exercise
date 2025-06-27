import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from '../interfaces/dto/create-author.dto';
import { UpdateAuthorDto } from '../interfaces/dto/update-author.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create an author', 
    description: 'Creates and adds an author to the record.' 
  })
  create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.createAuthor(createAuthorDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all authors', 
    description: 'Retrieves all authors in the record.' 
  })
  findAll() {
    return this.authorsService.findAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get author', 
    description: 'Retrieves a single author based on its ID.' 
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findAuthor(id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update author', 
    description: 'Updates a single author based on its ID, new data will be based on the request body. All properties of the author can be updated except for its ID.' 
  })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete author', 
    description: 'Deletes a single author based on its ID.' 
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.removeAuthor(id);
  }

  @Get('book/:bookId')
  @ApiOperation({ 
    summary: 'Get all the authors of a book', 
    description: 'Retrieves all authors of a book based on its bookID.' 
  })
  findBookAuthors(@Param('bookId', ParseIntPipe) bookId: number) {
    try {
      return this.authorsService.findBookAuthors(bookId);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
