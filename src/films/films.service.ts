import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/database/entities/Film';
import { EntityManager, Repository } from 'typeorm';
import { LanguagesService } from 'src/languages/languages.service';
import { threadId } from 'worker_threads';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @Inject(forwardRef(() => LanguagesService))
    private readonly languagesService: LanguagesService,
    private readonly entityManager: EntityManager,
  ) {}

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

  async countFilmByLanguageId(languageId: number): Promise<number> {
    return await this.filmsRepository.count({
      where: { languageId: languageId },
    });
  }
}
