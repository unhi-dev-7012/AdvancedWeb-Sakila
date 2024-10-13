import { IsString, Length } from "class-validator";

export class UpdateActorDto {

    @IsString()
    @Length(1, 45, {message: 'First name must be less than 45 characters'})
    firstName!: string;

    @IsString()
    @Length(1, 45, {message: 'First name must be less than 45 characters'})
    lastName!: string;
}
