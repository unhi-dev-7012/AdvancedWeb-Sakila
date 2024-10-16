import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('api/user/v1/actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  async create(@Body() createActorDto: CreateActorDto) {
    console.log(createActorDto);
    return this.actorsService.create(createActorDto);
  }

  @Get()
  async findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}
