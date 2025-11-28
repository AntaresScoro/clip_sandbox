import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import type { Clip } from './interfaces/clip.interface';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  create(@Body() clip: CreateClipDto): Clip {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Clip {
    return this.clipsService.findOne(id);
  }

  @Get()
  findAll(): Clip[] {
    return this.clipsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): object {
    this.clipsService.delete(id);
    return { message: "L'élément à été supprimé" };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() clip: UpdateClipDto): Clip {
    return this.clipsService.updateOne(id, clip);
  }
}