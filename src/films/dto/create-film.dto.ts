import { MpaaRating } from 'src/database/entities/Film';

export class CreateFilmDto {
  title: string;

  description: string | null;

  releaseYear: number | null;

  languageId: number;

  originalLanguageId: number | null;

  rentalDuration: number;

  rentalRate: number;

  length: number | undefined;

  replacementCost: number;
  rating: MpaaRating | null; // Change type to the enum
  lastUpdate: Date;

  specialFeatures: string[] | null;

  fulltext: string;
}
