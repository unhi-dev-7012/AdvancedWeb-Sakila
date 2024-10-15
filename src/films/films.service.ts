import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class FilmsService {

  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    private readonly entityManager: EntityManager 
  ){}

  async create(createFilmDto: CreateFilmDto) {
    try {
      const film = new Film(createFilmDto);
      await this.filmsRepository.insert(film);
      return {
        success: true,
        message: "Create new film successfully",
        data: film
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const films = await this.filmsRepository.find();
      return {
        success: true,
        message: "Retrieve all fimls successfully",
        data: films
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(film_id: number) {
    try {
      const film = await this.filmsRepository.findOne({where: {filmId: film_id}});
      const message = !film ? `Can't find film which id ${film_id}` : `Find film with id ${film_id} successfully`;
      return {
        success: !film ? false : true,
        message: message,
        data: film
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    try {
      const film = await this.filmsRepository.findOne({where: {filmId: id}});
      const message = !film ? `Can't find film which id ${id}` : `Find film with id ${id} successfully`;
      Object.assign(film, updateFilmDto);
      await this.filmsRepository.update(id, film);
      return {
        success: !film ? true : false,
        message: message,
        data: film
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} film`;
  }
}
