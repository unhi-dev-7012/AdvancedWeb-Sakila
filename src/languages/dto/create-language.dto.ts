import { IsDefined, IsString, Length } from "class-validator";

export class CreateLanguageDto {
    @IsString()
    @Length(1, 20, {message: 'Name must be less than 20 characters'})
    @IsDefined()
    name!: string

}
