import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateFilmDto {
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
