import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/domain/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env'});

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    // entities: [`${__dirname}/domain/entities/*.entity{.ts,.js}`],
    entities: [
        User
    ],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    autoLoadEntities: false,
    synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);