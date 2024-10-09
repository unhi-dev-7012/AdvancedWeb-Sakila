import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { FilmsModule } from './films/films.module';
// import { FilmActor } from './database/entities/FilmActor';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    ActorsModule,
    FilmsModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
