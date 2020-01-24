import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';

const server = express();

export const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();

  return app.init();
};

createNestServer(server)
    .then(v => ('Nest Ready'))
    .catch(err => ('Nest broken'));
export const api = functions.https.onRequest(server);

