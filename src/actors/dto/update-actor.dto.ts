import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateActorDto {

    firstName!: string;
    
    lastName!: string;
}
