import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { GetClipsQueryDto } from './dto/get-clips-query.dto';
import { Clip, ClipDocument } from './schema/clip.schema';

@Injectable()
export class ClipsService {
  constructor(
    @InjectModel(Clip.name) private readonly clipModel: Model<ClipDocument>,
  ) {}

  async create(clip: CreateClipDto): Promise<ClipDocument> {
    const createdClip = new this.clipModel(clip);
    return createdClip.save();
  }

  async findOne(id: string): Promise<ClipDocument> {
    const clip = await this.clipModel.findById(id).exec();
    if (clip) return clip;
    throw new NotFoundException(`Clip with id ${id} not found`);
  }

  async findAll(query: GetClipsQueryDto): Promise<{
    items: ClipDocument[];
    total: number;
    page: number;
    limit: number;
    pageCount: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const filter: Record<string, any> = {};
    if (query.streamerName) {
      filter.streamerName = query.streamerName;
    }
    if (query.search) {
      filter.$or = [
        { title: new RegExp(query.search, 'i') },
        { description: new RegExp(query.search, 'i') },
      ];
    }
    if (query.isPublished !== undefined) {
      filter.isPublished = query.isPublished;
    }

    const items = await this.clipModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.clipModel.countDocuments(filter).exec();
    return {
      items: items,
      total: total,
      page: page,
      limit: limit,
      pageCount: Math.ceil(total / limit),
    };
  }

  async delete(id: string): Promise<void> {
    const deleteResult = await this.clipModel.deleteOne({ _id: id }).exec();
    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException(`Clip with id ${id} not found`);
    }
  }

  async updateOne(id: string, clip: UpdateClipDto): Promise<ClipDocument> {
    const modifiedClip = await this.clipModel
      .findByIdAndUpdate(id, { ...clip }, { new: true })
      .exec();
    if (modifiedClip) return modifiedClip;
    throw new NotFoundException(`Clip with id ${id} not found`);
  }

  async publish(id: string): Promise<ClipDocument> {
    const modifiedClip = await this.clipModel
      .findByIdAndUpdate(id, { isPublished: true }, { new: true })
      .exec();
    if (modifiedClip) return modifiedClip;
    throw new NotFoundException(`Clip with id ${id} not found`);
  }

  async unpublish(id: string): Promise<ClipDocument> {
    const modifiedClip = await this.clipModel
      .findByIdAndUpdate(id, { isPublished: false }, { new: true })
      .exec();
    if (modifiedClip) return modifiedClip;
    throw new NotFoundException(`Clip with id ${id} not found`);
  }
}
