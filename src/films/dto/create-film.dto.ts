import { IsArray, IsDefined, IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { MpaaRating } from 'src/database/entities/Film';

export class CreateFilmDto {
  @IsDefined()
  @Length(1, 255)
  title: string;

  @IsString()
  description: string | null;

  @IsNumber()
  releaseYear: number | null;

  @IsDefined()
  @IsNumber()
  languageId: number;

  @IsNumber()
  originalLanguageId: number | null;

  @IsNumber()
  rentalDuration: number;

  @IsNumber()
  rentalRate: number;

  @IsNumber()
  length: number | undefined;

  @IsNumber()
  replacementCost: number;

  @IsEnum(MpaaRating)
  rating: MpaaRating | null; // Change type to the enum

  @IsArray()
  specialFeatures: string[] | null;

  @IsDefined()
  fulltext: string;
}
