import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorsDatabaseService } from 'src/authors/authors-database.service';

@Module({
  imports: [AuthorsDatabaseService],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule {}
