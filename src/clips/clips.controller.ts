import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch, Query,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { GetClipsQueryDto } from './dto/get-clips-query.dto';
import { ClipDocument } from './schema/clip.schema';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Post()
  async create(@Body() clip: CreateClipDto): Promise<ClipDocument> {
    return this.clipsService.create(clip);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.findOne(id);
  }

  @Get()
  async findAll(@Query() queryDto: GetClipsQueryDto): Promise<{
    items: ClipDocument[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    return this.clipsService.findAll(queryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.clipsService.delete(id);
    return { message: "L'élément à été supprimé" };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() clip: UpdateClipDto,
  ): Promise<ClipDocument> {
    return await this.clipsService.updateOne(id, clip);
  }
}
