import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('languages')
@Controller('api/user/v1/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiOperation({ summary: 'Create a new language' })
  @ApiBody({
    description: 'The new language information.',
    schema: {
      example: {
        name: 'New Language',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new language successfully.',
    schema: {
      example: {
        success: true,
        message: 'Create language successfully',
        data: {
          name: 'New Language',
          languageId: 8,
          lastUpdate: new Date(),
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Language created failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @ApiOperation({ summary: 'Find all languages' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find all languages successfully.',
    schema: {
      example: {
        success: true,
        message: 'Find all languages successfully.',
        data: [],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find all language failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find an language by Id' })
  @ApiParam({
    name: 'id',
    description: 'The id of an language',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find an language successfully',
    schema: {
      example: {
        success: true,
        message: `Finding language with id 1 successfully`,
        data: {
          languageId: 1,
          name: 'English',
          lastUpdate: '2006-02-14T22:02:19.000Z',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'language does not exist',
    schema: {
      example: {
        success: false,
        message: "Can't finding language with id 1",
        data: {
          success: false,
          message: `Language with id 1 does not exist`,
          data: {},
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Find language failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languagesService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update language Information' })
  @ApiParam({
    name: 'id',
    description: 'The id of an language',
    type: String,
  })
  @ApiBody({
    description: 'The update information of an language',
    schema: {
      example: {
        name: 'Updated Language',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update language Information successfully',
    schema: {
      example: {
        successful: true,
        message: 'Update language successfully',
        data: {
          name: 'Updated Language',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Language does not exist',
    schema: {
      example: {
        success: false,
        message: `Language with id 1 does not exist`,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Update language failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: 'Delete a language' })
  @ApiParam({
    name: 'id',
    description: 'The id of an language',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an language successfully',
    schema: {
      example: {
        success: true,
        message: `Language with id 1 has been deleted successfully.`,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Language does not exist',
    schema: {
      example: {
        success: false,
        message: `Language with id does not exist`,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Language does not exist',
    schema: {
      example: {
        success: false,
        message: `Language with id 1 cannot be deleted because it is associated with one or more films.`,
        data: {},
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Delete language failed',
    schema: {
      example: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'This is the error message.',
      },
    },
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languagesService.remove(+id);
  }
}
