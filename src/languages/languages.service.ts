import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/database/entities/Language';
import { Repository } from 'typeorm';
import { FilmsService } from 'src/films/films.service';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
    @Inject(forwardRef(() => FilmsService))
    private readonly filmsService: FilmsService,
  ) {}
  async create(createLanguageDto: CreateLanguageDto) {
    const language = new Language(createLanguageDto);
    try {
      await this.languagesRepository.insert(language);
      return {
        success: true,
        message: 'Create language successfully',
        data: language,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const resFind = await this.languagesRepository.find();
      return {
        success: true,
        message: 'Find all languages successfully.',
        data: resFind,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const language = await this.languagesRepository.findOne({
        where: { languageId: id },
      });
      if (!language) {
        throw new HttpException(
          {
            success: false,
            message: `Language with id ${id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        success: true,
        message: `Finding language with id ${id} successfully`,
        data: language,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    try {
      const language = await this.languagesRepository.findOneBy({
        languageId: id,
      });
      if (!language) {
        throw new HttpException(
          {
            success: false,
            message: `Language with id ${id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.languagesRepository.update(id, updateLanguageDto);

      return {
        success: true,
        message: 'Update language successfully',
        data: updateLanguageDto,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const language = await this.languagesRepository.findOneBy({
        languageId: id,
      });
      if (!language) {
        throw new HttpException(
          {
            success: false,
            message: `Language with id ${id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const count = await this.filmsService.countFilmByLanguageId(id);
      if (count > 0) {
        throw new HttpException(
          {
            success: false,
            message: `Language with id ${id} cannot be deleted because it is associated with one or more films.`,
            data: {},
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      await this.languagesRepository.remove(language);
      return {
        success: true,
        message: `Language with id ${id} has been deleted successfully.`,
        data: {},
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
