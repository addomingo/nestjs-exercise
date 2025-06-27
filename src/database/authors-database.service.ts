import { Injectable, NotFoundException } from '@nestjs/common';
import { Author } from 'src/interfaces/author';
import { CreateAuthorDto } from 'src/interfaces/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/interfaces/dto/update-author.dto';

/**
 * This service's sole purpose is to provide CRUD operations that directly communicate with in-memory data.
 */
@Injectable()
export class AuthorsDatabaseService {
  private readonly authors: Author[] = [];
  private currId = 1;

  // This action adds a new author
  create(createAuthorDto: CreateAuthorDto): Author {
    const newAuthor: Author = {
      id: this.currId,
      firstName: createAuthorDto.firstName,
      lastName: createAuthorDto.lastName
    };

    this.authors.push(newAuthor);
    this.currId++; // update id count
    return newAuthor;
  }

  // This action returns all authors
  findAll(): Author[] {
    return this.authors;
  }

  // This action returns a single author
  findOne(id: number): Author {
    const author = this.authors.find(author => id === author.id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  // This action updates a single author
  update(id: number, updateAuthorDto: UpdateAuthorDto): Author {
    const author = this.findOne(id);
    Object.assign(author, updateAuthorDto); // assign properties of updateAuthorDto to the author object in the array
    return author;
  }

  // This action deletes a single author
  remove(id: number) {
    const index = this.authors.findIndex((author) => author.id === id);
    if (index === -1) {
      throw new NotFoundException('Author not found');
    }
    this.authors.splice(index, 1);
    return 'Author deleted'
  }
}