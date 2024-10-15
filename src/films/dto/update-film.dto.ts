import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  title: string;

  description?: string;

  releaseYear?: number;

  languageId: number;
}
