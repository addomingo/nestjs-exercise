import { Module } from '@nestjs/common';
import { AuthorsDatabaseService } from './authors-database.service';
import { BooksDatabaseService } from './books-database.service';

@Module({
    controllers: [],
    providers: [AuthorsDatabaseService, BooksDatabaseService],
    exports: [AuthorsDatabaseService, BooksDatabaseService]
})
export class DatabaseModule {}
