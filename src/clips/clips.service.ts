import { Injectable } from '@nestjs/common';
import { Clip } from './interfaces/clip.interface';

@Injectable()
export class ClipsService {
  private readonly clips: Clip[] = [];

  create(clip: Clip) {
    clip._id = this.clips.length + 1;
    clip._createdAt = new Date();
    this.clips.push(clip);
    return clip;
  }

  findOne(id: number): Clip | undefined {
    return this.clips.find((clip: Clip) => clip._id === id);
  }

  findAll(): Clip[] {
    return this.clips;
  }

  delete(id: number): any {
    return this.clips.splice(this.clips.findIndex((clip: Clip) => clip._id === id), 1);
  }

  updateOne(id: number, clip: Clip): Clip {
    const index = this.clips.findIndex((c: Clip) => c._id === id);

    if (index === -1) {
      throw new Error(`Clip with id ${id} not found`);
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
