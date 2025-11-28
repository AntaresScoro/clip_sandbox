import { Injectable, NotFoundException } from '@nestjs/common';
import { Clip } from './interfaces/clip.interface';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';

@Injectable()
export class ClipsService {
  private readonly clips: Clip[] = [];

  create(clip: CreateClipDto) : Clip {
    const newClip: Clip = {
      ...clip,
      _id: String(Number(this.clips.length) + 1),
      _createdAt: new Date()
    }
    this.clips.push(newClip);
    return newClip;
  }

  findOne(id: string): Clip {
    const clip = this.clips.find((clip: Clip) => clip._id === id);
    if( clip ) return clip
    throw new NotFoundException(
      `Clip with id ${id} not found`
    )
  }

  findAll(): Clip[] {
    return this.clips;
  }

  delete(id: string): void {
    const index = this.clips.findIndex((clip: Clip) => clip._id === id);
    if (index === -1) {
      throw new NotFoundException(`Clip with id ${id} not found`);
    }
  }

  updateOne(id: string, clip: UpdateClipDto): Clip {
    const index = this.clips.findIndex((c: Clip) => c._id === id);

    if (index === -1) {
      throw new NotFoundException(`Clip with id ${id} not found`);
    }

    this.clips[index] = {
      ...this.clips[index],
      ...clip,
      _id: id,
      _createdAt: this.clips[index]._createdAt
    };

    return this.clips[index];
  }
}
