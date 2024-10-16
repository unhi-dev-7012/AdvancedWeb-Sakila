import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/Actor';
import { Film } from './entities/Film';
@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type:"postgres",
                host: configService.getOrThrow("DB_HOST"),
                port: configService.getOrThrow("DB_PORT"),
                database: configService.getOrThrow("DB_DATABASE"),
                username: configService.getOrThrow("DB_USERNAME"),
                password: configService.getOrThrow("DB_PASSWORD"),
                autoLoadEntities: true,
                entities: [Actor, Film],
                synchronize: false,
                logging: true,
            }),
            inject: [ConfigService],
        }), 
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
