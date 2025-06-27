import { HttpException, HttpStatus } from "@nestjs/common";

export class BookDuplicateException extends HttpException {
  constructor() {
    super('Book already exists in the record.', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidBookGenreException extends HttpException {
  constructor(genre: string) {
    super(`${genre} is not a valid book genre.`, HttpStatus.BAD_REQUEST);
  }
}

export class DuplicateAuthorBookReferenceException extends HttpException {
  constructor(authorId: number, bookId: number) {
    super(`Author with ID ${authorId} is already associated with Book having ID ${bookId}`, HttpStatus.BAD_REQUEST);
  }
}

export class NonExistentAuthorBookReferenceException extends HttpException {
  constructor(authorId: number, bookId: number) {
    super(`Author with ID ${authorId} is not associated with Book having ID ${bookId}`, HttpStatus.BAD_REQUEST);
  }
}

export class DuplicateAuthorReferencesInIDListException extends HttpException {
  constructor() {
    super(`Duplicate authors IDs in authorIds list.`, HttpStatus.BAD_REQUEST);
  }
}