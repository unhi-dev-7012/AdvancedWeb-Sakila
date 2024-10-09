import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]), // Register the Actor entity
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
