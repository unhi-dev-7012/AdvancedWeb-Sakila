import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
        @IsString()
        @Length(1, 255, {message: 'Title must be less than 255 characters'})
        title: string;

        @IsString()
        @IsOptional()
        description?: string; 

        @IsNumber()
        @IsOptional()
        releaseYear?: number;

        @IsNumber()
        languageId: number;

}
