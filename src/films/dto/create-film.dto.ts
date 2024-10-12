import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateFilmDto {
    @IsString()
    @Length(1, 255, {message: 'First name must be less than 255 characters'})
    title!: string;

    @IsString()
    @IsOptional()
    description?: string; 

    @IsNumber()
    @IsOptional()
    releaseYear?: number;

    @IsNumber()
    languaeId: number;


}
