import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @ApiOperation({description: "Create a new actor"})
  @ApiResponse({
    status: 200,
    example: {
      success: true,
      message: "Can't finding actor with id 10203",
      data: {
        actorId: 1,
        firstName: "Actor's first name",
        lastName: "Actor's last name",
        lastUpdate: "2006-02-14T21:34:33.000Z"
      }
    }
  })
  async create(@Body() createActorDto: CreateActorDto) {
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
  async update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}
