import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../interfaces/dto/create-author.dto';
import { UpdateAuthorDto } from '../interfaces/dto/update-author.dto';
import { Author } from '../interfaces/author';
import { AuthorDuplicateException, AuthorHasExistingBooksException } from './authors.exception';
import { AuthorsDatabaseService } from 'src/database/authors-database.service';
import { BooksDatabaseService } from 'src/database/books-database.service';

/**
 * Handles the business logic of Author operations.
 */
@Injectable()
export class AuthorsService {

  constructor(
    private authorDbService: AuthorsDatabaseService, // CRUD service
    private booksDbService: BooksDatabaseService
  ) {} 

  createAuthor(createAuthorDto: CreateAuthorDto): Author {
    const authors = this.authorDbService.findAll();
    const existingAuthor = authors.find(author => 
      (createAuthorDto.firstName === author.firstName) && (createAuthorDto.lastName === author.lastName)
    );

    if (existingAuthor) throw new AuthorDuplicateException();
    return this.authorDbService.create(createAuthorDto);
  }

  findAllAuthors(): Author[] {
    return this.authorDbService.findAll();
  }

  findAuthor(id: number): Author {
    try {
      return this.authorDbService.findOne(id);
    } catch (err) {
      throw err;
    }
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    try {
      return this.authorDbService.update(id, updateAuthorDto);
    } catch (err) {
      throw err;
    }
  }

  // hard deletion with validation
  removeAuthor(id: number) {
    try {
      const books = this.booksDbService.findAll();
      const booksByAuthor = books.filter((book) => book.authorIds.includes(id));

      if (booksByAuthor.length > 0){
        throw new AuthorHasExistingBooksException();
      }

      return this.authorDbService.remove(id);
    } catch (err) {
      throw err;
    }
  }

  // This action finds all the authors of a certain book
  findBookAuthors(bookId: number): Author[] {
    try {
      const book = this.booksDbService.findOne(bookId);
      const authorList = book.authorIds.map((id) => this.authorDbService.findOne(id));
      return authorList;
    } catch (err) {
      throw err;
    }
  }
}
