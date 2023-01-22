import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DB_TYPE || 'postgres',
  synchronize: true,
  logging: true,
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'math-exam-dev',
  entities: ['entity/*'],
  autoLoadEntities: true,
  extra: {
    connectionLimit: 10,
  },
}));
