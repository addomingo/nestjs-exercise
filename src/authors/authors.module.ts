import { forwardRef, Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [forwardRef(() => BooksModule)],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
