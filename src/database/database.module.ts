import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get<TypeOrmModuleAsyncOptions>('database'),
        }), 
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
