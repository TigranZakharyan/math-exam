import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  synchronize: false,
  username: 'postgres',
  password: 'postgres',
  database: 'math_exam_dev',
  entities: ['./src/entity/*'],
  migrations: ['./src/migrations/*'],
  migrationsTableName: 'migrations_typeorm',
});
