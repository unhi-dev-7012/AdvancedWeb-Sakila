import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';
import { EntityManager, Repository } from 'typeorm';
import { LanguagesService } from '../languages/languages.service';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly entityManager: EntityManager,
    private readonly languageService: LanguagesService,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const language = await this.languageService.findOne(
      createFilmDto.languageId,
    );
    if (!language.data) {
      return {
        message: 'Language not found!',
      };
    }

    try {
      const film = new Film(createFilmDto);
      return {
        success: true,
        message: 'Create film successfully',
        data: film,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.filmsRepository.find();
  }

  findOne(film_id: number) {
    return this.filmsRepository.findOneBy({ filmId: film_id });
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
