import { Test, TestingModule } from '@nestjs/testing';
import { BooksDatabaseService } from './books-database.service';

describe('BooksDatabaseService', () => {
  let service: BooksDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksDatabaseService],
    }).compile();

    service = module.get<BooksDatabaseService>(BooksDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
