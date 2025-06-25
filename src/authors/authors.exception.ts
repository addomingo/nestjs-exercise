import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthorDuplicateException extends HttpException {
  constructor() {
    super('Author already exists in the record.', HttpStatus.BAD_REQUEST);
  }
}