import { Injectable } from '@nestjs/common';

@Injectable()
export class ClipsService {
  findAll(): string[] {
    return [
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ];
  }
}
