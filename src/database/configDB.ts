import { registerAs } from "@nestjs/config";

export default registerAs('database', () =>({
    type: process.env.POSTGRES_TYPE,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: process.env.POSTGRES_PORT,
    logging: true,
    autoLoadEntities: true,
    synchronize: false,
    entities: ['dist/database/entities/*.js'],
}));