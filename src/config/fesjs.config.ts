import { Config } from 'fests';
import path from 'path';

const config: Config = {
  dirroot: path.join(__dirname, '..'),
  env: {
    PORT: 3001,
    JWT_SECRET: 'longnd',
  },
  database: [
    {
      type: 'mongo',
      host: 'f1micro.vps',
      dbName: 'fests',
      user: 'longnd',
      pass: 'long@123',
    },
  ],
};

export default config;
