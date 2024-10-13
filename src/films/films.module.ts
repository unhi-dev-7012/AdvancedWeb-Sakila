import { forwardRef, Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Film]),
    forwardRef(() => LanguagesModule),
  ],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService]
})
export class FilmsModule {}
