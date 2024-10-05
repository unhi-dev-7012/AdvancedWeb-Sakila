import { PartialType } from '@nestjs/mapped-types';
import { CreateActorDto } from './create-actor.dto';

export class UpdateActorDto {
    first_name: string;
    last_name: string;
}
