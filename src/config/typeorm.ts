import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenvConfig({ path: '.env'});

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [`dist/domain/entities/*.entity{.ts,.js}`],
    migrations: [`dist/migrations/*{.ts,.js}`],
    autoLoadEntities: true,
    synchronize: false,
    nameingStrategy: new SnakeNamingStrategy()
};

console.log("console __dirname", __dirname);

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);