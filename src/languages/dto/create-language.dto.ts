import { IsDefined, IsOptional, IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsDefined()
  @Length(1, 20)
  name!: string;
}
