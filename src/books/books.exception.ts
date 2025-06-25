import { HttpException, HttpStatus } from "@nestjs/common";

export class BookDuplicateException extends HttpException {
  constructor() {
    super('Book already exists in the record.', HttpStatus.BAD_REQUEST);
  }
}