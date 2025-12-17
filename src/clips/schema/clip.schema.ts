import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClipDocument = HydratedDocument<Clip>;

@Schema({
  timestamps: true,
})
export class Clip {
  @Prop({ required: true })
  title: string;
  @Prop()
  description?: string;
  @Prop({ required: true })
  url: string;
  @Prop({ required: true })
  duration: number;
  @Prop({ required: true })
  streamerName: string;
  @Prop({ default: false })
  isPublished: boolean;
}

export const ClipSchema = SchemaFactory.createForClass(Clip);
