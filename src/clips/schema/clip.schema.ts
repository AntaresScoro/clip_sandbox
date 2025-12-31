import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schema/user.schema';

export type ClipDocument = mongoose.HydratedDocument<Clip>;

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
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: false,
    index: true,
  })
  owner: mongoose.Types.ObjectId;
}
const ClipSchema = SchemaFactory.createForClass(Clip);
ClipSchema.index({ owner: 1, createdAt: -1 });
export { ClipSchema };
