import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiProperty({ name: 'title' })
  @IsString()
  @Length(1, 255, { message: 'Title must be less than 255 characters' })
  title: string;

  @ApiProperty({ name: 'description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ name: 'releaseYear' })
  @IsNumber()
  @IsOptional()
  releaseYear?: number;

  @ApiProperty({ name: 'languageId' })
  @IsNumber()
  languageId: number;
}
