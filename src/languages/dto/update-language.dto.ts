import { PartialType } from '@nestjs/swagger';
import { CreateLanguageDto } from './create-language.dto';
import { IsDefined, IsString, Length } from 'class-validator';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
    @IsString()
    @Length(1, 20, {message: 'Name must be less than 20 characters'})
    @IsDefined()
    name!: string
}
