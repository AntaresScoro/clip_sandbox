import { Controller, Get } from '@nestjs/common';
import { ClipsService } from './clips.service';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}
  @Get()
  getClips():  string[] {
    return this.clipsService.findAll();
  }
}
