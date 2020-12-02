import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'secret',
  database: 'taskmanagement',
  entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
  synchronize: true, // not recomended in production to leave this true
};
