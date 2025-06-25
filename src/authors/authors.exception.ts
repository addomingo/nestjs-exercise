import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthorDuplicateException extends HttpException {
  constructor() {
    super('Author already exists in the record.', HttpStatus.BAD_REQUEST);
  }
}

export class AuthorHasExistingBooksException extends HttpException {
  constructor() {
    super('Cannot delete author. Author has existing books, either remove the author from the book/s or delete the book/s.', HttpStatus.BAD_REQUEST);
  }
}