import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { MpaaRating } from 'src/database/entities/Film';

export class CreateFilmDto {
  @IsDefined()
  @Length(1, 255)
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  description: string | null;

  @IsNumber()
  @ApiProperty()
  releaseYear: number | null;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  languageId: number;

  @IsNumber()
  @ApiProperty()
  originalLanguageId: number | null;

  @IsNumber()
  @ApiProperty()
  rentalDuration: number;

  @IsNumber()
  @ApiProperty()
  rentalRate: number;

  @IsNumber()
  @ApiProperty()
  length: number | undefined;

  @IsNumber()
  @ApiProperty()
  replacementCost: number;

  @IsEnum(MpaaRating)
  @ApiProperty()
  rating: MpaaRating | null; // Change type to the enum

  @IsArray()
  @ApiProperty()
  specialFeatures: string[] | null;

  @IsDefined()
  @ApiProperty()
  fulltext: string;
}
