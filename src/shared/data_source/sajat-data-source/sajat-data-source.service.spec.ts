import { Test, TestingModule } from '@nestjs/testing';
import { SajatDataSourceService } from './sajat-data-source.service';

describe('SajatDataSourceService', () => {
  let service: SajatDataSourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SajatDataSourceService],
    }).compile();

    service = module.get<SajatDataSourceService>(SajatDataSourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
