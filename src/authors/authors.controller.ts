import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.authorsService.findOne(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    try {
      return this.authorsService.update(id, updateAuthorDto);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.authorsService.remove(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
