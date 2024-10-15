import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { FilmsModule } from './films/films.module';
// import { FilmActor } from './database/entities/FilmActor';
import { LanguagesModule } from './languages/languages.module';
import configDB from './database/configDB';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, load: [configDB]}),
    DatabaseModule,
    ActorsModule,
    FilmsModule,
    LanguagesModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
