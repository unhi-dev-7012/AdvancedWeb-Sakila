import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../database/entities/Language';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languagesRepository: Repository<Language>,
    private readonly entityManager: EntityManager,
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
      // throw new Error(`Failed to create language: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all languages`;
  }

  async findOne(id: number) {
    try {
      const language = await this.languagesRepository.findOne({
        where: { languageId: id },
      });
      const message = language
        ? `Finding language with id ${id} successfully`
        : `Can't finding language with id ${id}`;
      return {
        success: language ? true : false,
        message: message,
        data: language,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
