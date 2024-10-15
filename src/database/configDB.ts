import { registerAs } from "@nestjs/config";

export default registerAs('database', () =>({
    type: process.env.DB_TYPE,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    logging: true,
    autoLoadEntities: true,
    synchronize: false,
    entities: ['dist/database/entities/*.js'],
}));