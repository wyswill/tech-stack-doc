import { MidwayConfig } from '@midwayjs/core';
import path = require('path');
import UserEntity from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655864045501_1975',
  koa: {
    port: 7001
  },
  orm: {
    type: 'sqlite',
    database: path.resolve(__dirname, '../db/sqllite.db'),
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false
  },
  jwt: {
    secret: '!@#$%^&*()_+'
  }
} as MidwayConfig;
