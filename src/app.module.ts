import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    ActorsModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
