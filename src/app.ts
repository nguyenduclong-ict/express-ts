import 'module-alias/register';
import express from 'express';
import config from './config/fesjs.config';
import { FesServer } from 'fests';
import http from 'http';
import connectMongodb from './data/mongo';

export const app = express();
export const server = http.createServer(app);

FesServer(config, app, server)
  .start()
  .then(() => {
    console.log('Server started');
    connectMongodb();
  });
