import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { User } from 'src/users/entities/user.entity';
import { Kategori } from 'src/kategori/entities/kategori.entity';
import { Lomba } from 'src/lomba/entities/lomba.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'DEVELOPMENT':
          config = databaseConfig.development;
          break;
        case 'TEST':
          config = databaseConfig.test;
          break;
        case 'PRODUCTION':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([User, Kategori, Lomba]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
