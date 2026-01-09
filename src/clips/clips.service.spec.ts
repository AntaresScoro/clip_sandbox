import { Test, TestingModule } from '@nestjs/testing';
import { ClipsService } from './clips.service';
import { Clip } from './schema/clip.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('ClipsService', () => {
  let service: ClipsService;
  const clipModelMock = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClipsService,
        { provide: getModelToken(Clip.name), useValue: clipModelMock },
      ],
    }).compile();

    service = module.get<ClipsService>(ClipsService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
