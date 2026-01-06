import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClipsService } from './clips.service';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { GetClipsQueryDto } from './dto/get-clips-query.dto';
import { ClipDocument } from './schema/clip.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ClipOwnerGuard } from './guards/clip-owner.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @CurrentUser('userId') userId: string,
    @Body() clip: CreateClipDto,
  ): Promise<ClipDocument> {
    return this.clipsService.create(clip, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.findOne(id);
  }

  @Get()
  async findAll(@Query() query: GetClipsQueryDto): Promise<{
    data: ClipDocument[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pageCount: number;
    };
  }> {
    const clips = await this.clipsService.findAll(query);
    return {
      data: clips.items,
      meta: {
        total: clips.total,
        page: clips.page,
        limit: clips.limit,
        pageCount: clips.pageCount,
      },
    };
  }

  @UseGuards(JwtAuthGuard, ClipOwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.clipsService.delete(id);
    return { message: "L'élément à été supprimé" };
  }

  @UseGuards(JwtAuthGuard, ClipOwnerGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() clip: UpdateClipDto,
  ): Promise<ClipDocument> {
    return this.clipsService.updateOne(id, clip);
  }

  @UseGuards(JwtAuthGuard, ClipOwnerGuard)
  @Patch(':id/publish')
  async publish(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.publish(id);
  }

  @UseGuards(JwtAuthGuard, ClipOwnerGuard)
  @Patch(':id/unpublish')
  async unpublish(@Param('id') id: string): Promise<ClipDocument> {
    return this.clipsService.unpublish(id);
  }
}
