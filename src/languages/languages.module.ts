import { forwardRef, Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from 'src/database/entities/Language';
import { FilmsModule } from 'src/films/films.module';
import { FilmsService } from 'src/films/films.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Language]),
    forwardRef(() => FilmsModule) 
  ],
  controllers: [LanguagesController],
  providers: [LanguagesService],
  exports: [LanguagesService]
})
export class LanguagesModule {}
