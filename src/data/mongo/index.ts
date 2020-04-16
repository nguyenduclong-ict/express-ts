import { Config } from 'fests';
import mongoose from 'mongoose';

export default async function connectMongodb() {
  try {
    const config = Config.database.find((c) => c.type === 'mongo');
    if (!config) throw new Error('No config for mongodb');

    const { host, port, dbName, user, pass } = config;
    const uri = `mongodb://${host}:${port}/${dbName}`;

    const defaultConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    await mongoose.connect(uri, {
      ...defaultConfig,
      user,
      pass,
    });
    console.log('mongodb: connected', {
      host,
      dbName,
    });
  } catch (error) {
    console.error('Connect mongodb error:', error);
  }
}
