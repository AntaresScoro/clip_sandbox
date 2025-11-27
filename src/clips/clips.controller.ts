import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { Clip } from './interfaces/clip.interface';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  create(@Body() clip: any): any {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Clip | undefined {
    return this.clipsService.findOne(id);
  }

  @Get()
  findAll(): Clip[] {
    return this.clipsService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): object {
    return this.clipsService.delete(id).length >= 1 ? {message: "L'élément à été supprimé"} : {message: "Rien n'a été supprimé"};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() clip: any): Clip | undefined {
    return this.clipsService.updateOne(id, clip);
  }
}
