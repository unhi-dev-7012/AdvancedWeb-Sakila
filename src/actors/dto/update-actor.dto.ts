import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateActorDto {

    @ApiProperty({name: 'firstName'})
    @IsString()
    @Length(1, 45, {message: 'First name must be less than 45 characters'})
    firstName!: string;

    @ApiProperty({name: 'lastName'})
    @IsString()
    @Length(1, 45, {message: 'First name must be less than 45 characters'})
    lastName!: string;
}
