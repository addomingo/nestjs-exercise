import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { BooksModule } from 'src/books/books.module';
import { AuthorsDatabaseService } from './authors-database.service';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsDatabaseService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
