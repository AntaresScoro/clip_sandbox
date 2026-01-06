import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Clip, ClipDocument } from '../clips/schema/clip.schema';
import { Model, Types } from 'mongoose';

const DEFAULT_OWNER_ID = '694306789da3d078594159af';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const clipsModel = app.get<Model<ClipDocument>>(getModelToken(Clip.name));

  const ownerObjectId = new Types.ObjectId(DEFAULT_OWNER_ID);

  const result = await clipsModel
    .updateMany(
      {
        $or: [{ owner: { $exists: false } }, { owner: null }],
      },
      { $set: { owner: ownerObjectId } },
    )
    .exec();

  console.log(`Migration terminée, ${result.modifiedCount} clips mis à jour.`);

  // 4. On ferme proprement le contexte Nest
  await app.close();
}

bootstrap();
