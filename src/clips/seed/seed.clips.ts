// src/seed-clips.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clip, ClipDocument } from '../schema/clip.schema';

async function bootstrap() {
  // On démarre l'app Nest sans serveur HTTP
  const app = await NestFactory.createApplicationContext(AppModule);

  // On récupère directement le modèle Mongoose
  const clipModel = app.get<Model<ClipDocument>>(getModelToken(Clip.name));

  // ⚠️ Optionnel : on vide la collection avant de reseeder
  await clipModel.deleteMany({});
  console.log('Collection clips vidée.');

  // On génère 30 clips de test
  const streamerNames = ['Antares', 'NoobMaster', 'SpeedRunner', 'ProGamer'];
  const clips = Array.from({ length: 30 }).map((_, index) => {
    const i = index + 1;
    return {
      title: `Clip de test n°${i}`,
      description: `Ceci est la description du clip de test n°${i}.`,
      url: `https://example.com/clip-${i}`,
      duration: 30 + i, // durée en secondes
      streamerName: streamerNames[index % streamerNames.length],
    };
  });

  // Insertion en bulk
  await clipModel.insertMany(clips);
  console.log(`${clips.length} clips insérés dans la base.`);

  await app.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});