import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, Length } from "class-validator";

export class CreateActorDto {
    // 4** erorr will be handled here in the next week.

    @IsDefined()
    @Length(1, 45)
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsDefined()
    @Length(1, 45)
    @IsString()
    @ApiProperty()
    lastName: string;
}