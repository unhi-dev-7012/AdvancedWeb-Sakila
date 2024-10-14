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
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('films')
@Controller('api/user/v1/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiOperation({ summary: 'Creat a new film' })
  @ApiBody({
    description: 'New Film Information',
    schema: {
      example: {
        title: 'Hello World!',
        description: 'This is new film',
        releaseYear: 2024,
        languageId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new film successfully.',
    schema: {
      example: {
        title: 'Hello World!',
        description: 'This is new film',
        releaseYear: 2024,
        languageId: 1,
        filmId: 1,
        rentalDuration: 3,
        rentalRate: '4.99',
        replacementCost: '19.99',
        rating: 'G',
        lastUpdate: new Date(),
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'film does not exist',
    schema: {
      example: {
        success: false,
        message: 'Language not found',
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Film created failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all films' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find all films successfully.',
    schema: {
      example: {
        success: true,
        message: 'Find all films successfully.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find all film failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an film by Id' })
  @ApiParam({
    name: 'id',
    description: 'The id of an film',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find an film successfully',
    schema: {
      example: {
        success: true,
        message: 'Finding an film with id 1 successfully.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'film does not exist',
    schema: {
      example: {
        success: false,
        message: "Can't finding film with id 1",
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find film failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update film Information' })
  @ApiParam({
    name: 'id',
    description: 'The id of an film',
    type: String,
  })
  @ApiBody({
    description: 'The update information of an film',
    schema: {
      example: {
        title: 'Hello World!',
        description: 'This is new film',
        releaseYear: 2024,
        languageId: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update film Information successfully',
    schema: {
      example: {
        successful: true,
        message: 'Update film successfully',
        data: {
          title: 'Hello World!',
          description: 'This is new film',
          releaseYear: 2024,
          languageId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Film does not exist',
    schema: {
      example: {
        success: false,
        message: 'Film not found',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Language does not exist',
    schema: {
      example: {
        success: false,
        message: 'Language not found',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Update film failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filmsService.remove(+id);
  // }
}
