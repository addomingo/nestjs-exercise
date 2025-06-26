import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { AuthorsDatabaseModule } from './authors-database/authors-database.module';

@Module({
  imports: [BooksModule, AuthorsModule, AuthorsDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
