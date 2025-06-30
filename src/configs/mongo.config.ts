import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  const uri = getMongoString(configService);
  const options = getMongoOptions();

  console.log({ uri });
  return { uri, ...options };
};

const getMongoString = (configService: ConfigService) => {
  const uri =
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTH_DB');

  return uri;
};

const getMongoOptions = () => {
  return {};
};
