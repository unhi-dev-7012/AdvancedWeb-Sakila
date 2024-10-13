import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';
import { EntityManager, Repository } from 'typeorm';
import { LanguagesService } from 'src/languages/languages.service';

@Injectable()
export class FilmsService {

  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly entityManager: EntityManager,
    private readonly languagesService: LanguagesService,
  ){}

  async create(createFilmDto: CreateFilmDto) {
    const language = await this.languagesService.findOne(createFilmDto.languageId);
    if(!language.data){
      return {
        message: 'Language not found',
      };
    }
    try {
      const film = new Film(createFilmDto);
      await this.filmsRepository.insert(film);
      return {
        success: true,
        message: 'Create film successfully',
        data: language,
      };
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  findAll() {
    return this.filmsRepository.find();
  }

  findOne(film_id: number) {
    return this.filmsRepository.findOneBy({filmId: film_id});
  }

  update(id: number, updateFilmDto: UpdateFilmDto) {
    return `This action updates a #${id} film`;
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
