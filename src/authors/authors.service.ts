import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './authors.interface';
import { AuthorDuplicateException } from './authors.exception';
import { AuthorsDatabaseService } from './authors-database.service';

/**
 * Handles the business logic of Author operations.
 */
@Injectable()
export class AuthorsService {

  constructor(private dbService: AuthorsDatabaseService) {} // CRUD service

  createAuthor(createAuthorDto: CreateAuthorDto): Author {
    const authors = this.dbService.findAll();
    const existingAuthor = authors.find(author => 
      (createAuthorDto.firstName === author.firstName) && (createAuthorDto.lastName === author.lastName)
    );

    if (existingAuthor) throw new AuthorDuplicateException();
    return this.dbService.create(createAuthorDto);
  }

  findAllAuthors(): Author[] {
    return this.dbService.findAll();
  }

  findAuthor(id: number): Author {
    return this.dbService.findOne(id);
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    return this.dbService.update(id, updateAuthorDto);
  }

  // hard deletion with validation
  removeAuthor(id: number) {
    return this.dbService.remove(id);
  }
}
