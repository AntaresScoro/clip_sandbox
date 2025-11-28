import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClipDocument = HydratedDocument<Clip>;

@Schema({
  timestamps: true
})
export class Clip {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  url: string;
  @Prop()
  duration: number;
  @Prop()
  streamerName: string;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);