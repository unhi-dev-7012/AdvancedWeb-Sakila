import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/Actor';


@Module({
  imports: [
    TypeOrmModule.forFeature([Actor]), // Register the Actor entity
  ],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
