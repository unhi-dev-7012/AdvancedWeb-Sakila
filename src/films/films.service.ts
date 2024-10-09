import { Injectable } from '@nestjs/common';
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

  create(createFilmDto: CreateFilmDto) {
    return 'This action adds a new film';
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
