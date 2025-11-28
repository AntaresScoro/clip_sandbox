import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClipsController } from './clips.controller';
import { ClipsService } from './clips.service';
import { Clip, ClipSchema } from './schema/clip.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Clip.name, schema: ClipSchema }])],
  controllers: [ClipsController],
  providers: [ClipsService]
})
export class ClipsModule {}
