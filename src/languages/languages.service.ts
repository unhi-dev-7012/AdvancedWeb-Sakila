import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    private readonly filmsService: FilmsService
  ){}
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
        where: { languageId: id }
      });
      const message = language ? `Finding language with id ${id} successfully` : `Can't finding language with id ${id}`;
      return {
        success: language ? true : false,
        message: message,
        data: language,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    try {
      const actor = await this.languagesRepository.findOneBy({
        languageId: id,
      });
      await this.languagesRepository.update(id, updateLanguageDto);

      return {
        success: true,
        message: 'Update actor successfully',
        data: actor,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const language = await this.languagesRepository.findOneBy({languageId: id});
      if(!language) {
        return {
          success: false,
          message: `Language with ID ${id} not found`,
          data: {},
        };
      }
      const count =  await this.filmsService.countFilmByLanguageId(id);
      if(count > 0){
        throw new HttpException(`Language with id ${id} cannot be deleted because it is associated with one or more films.`, HttpStatus.BAD_REQUEST);
      }
      await this.languagesRepository.remove(language);
      return {
        success: true,
        message: `Language with id ${id} has been deleted successfully.`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
