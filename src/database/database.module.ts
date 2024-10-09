import { Inject, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './entities/Actor';
import { Film } from './entities/Film';
@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type:"postgres",
                host: configService.getOrThrow("POSTGRES_HOST"),
                port: configService.getOrThrow("POSTGRES_PORT"),
                database: configService.getOrThrow("POSTGRES_DATABASE"),
                username: configService.getOrThrow("POSTGRES_USERNAME"),
                password: configService.getOrThrow("POSTGRES_PASSWORD"),
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
