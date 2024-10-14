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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('actors')
@Controller('api/user/v1/actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Actor' })
  @ApiBody({
    description: 'New Actor Information',
    schema: {
      example: {
        firstName: 'Hy',
        lastName: 'Khang',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Actor created successfully',
    schema: {
      example: {
        success: true,
        message: 'Create actor successfully',
        data: {
          actorId: 1,
          firstName: 'Hy',
          lastName: 'Khang',
          lastUpdate: new Date(),
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Actor created failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  async create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @ApiOperation({ summary: 'Find all Actors' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find all Actors successfully.',
    schema: {
      example: {
        success: true,
        message: 'Find all Actors successfully.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find all actor failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Get()
  async findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an Actor by Id' })
  @ApiParam({
    name: 'id',
    description: 'The id of an Actor',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find an Actor successfully',
    schema: {
      example: {
        success: true,
        message: 'Finding an Actor with id 1 successfully.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Actor does not exist',
    schema: {
      example: {
        success: false,
        message: "Can't finding actor with id 1",
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find Actor failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return this.actorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Actor Information' })
  @ApiParam({
    name: 'id',
    description: 'The id of an Actor',
    type: String,
  })
  @ApiBody({
    description: 'The update information of an Actor',
    schema: {
      example: {
        firstName: 'Uyen',
        lastName: 'Nhi',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Actor Information successfully',
    schema: {
      example: {
        successful: true,
        message: 'Update actor successfully',
        data: {
          actorId: 1,
          firstName: 'Uyen',
          lastName: 'Nhi',
          lastUpdate: new Date(),
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Actor does not exist',
    schema: {
      example: {
        successful: false,
        message: 'Actor with id 1 does not exist',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Update Actor failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorsService.update(+id, updateActorDto);
  }

  @ApiOperation({ summary: 'Delete an Actor' })
  @ApiParam({
    name: 'id',
    description: 'The id of an Actor',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an Actor successfully',
    schema: {
      example: {
        success: true,
        message: 'Actor with ID 1 has been removed successfully',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Actor does not exist',
    schema: {
      example: {
        successful: false,
        message: 'Actor with id 1 does not exist',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Delete Actor failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.actorsService.remove(+id);
  }
}
