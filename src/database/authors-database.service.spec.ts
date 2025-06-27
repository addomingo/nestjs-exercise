import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsDatabaseService } from './authors-database.service';

describe('AuthorsDatabaseService', () => {
  let service: AuthorsDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsDatabaseService],
    }).compile();

    service = module.get<AuthorsDatabaseService>(AuthorsDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
