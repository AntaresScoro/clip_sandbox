import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { ClipsService } from './clips.service';
import { Clip } from './interfaces/clip.interface';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  addClip(@Body() clip: any): any {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  getOneClip(@Param() params: any): any {
    return this.clipsService.findOne(Number(params.id));
  }

  @Get()
  getClips(): Clip[] {
    return this.clipsService.findAll();
  }

  @Delete(':id')
  delete(@Param() params: any): any {
    return this.clipsService.delete(Number(params.id)).length >= 1 ? "L'élément à été supprimé" : "Rien n'a été supprimé";
  }

  @Patch(':id')
  updateClip(@Param()params: any, @Body() clip: any): any {
    return this.clipsService.updateOne(Number(params.id), clip);
  }
}
