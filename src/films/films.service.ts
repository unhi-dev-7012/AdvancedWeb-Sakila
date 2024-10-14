import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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

  async create(createFilmDto: CreateFilmDto) {
    const language = await this.languagesService.findOne(
      createFilmDto.languageId,
    );
    if (!language.data) {
      throw new HttpException(
        {
          success: false,
          message: 'Language not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const film = new Film(createFilmDto);
      await this.filmsRepository.insert(film);
      return {
        success: true,
        message: 'Create film successfully',
        data: film,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const filmFind = await this.filmsRepository.find();
      return {
        success: true,
        message: 'Find all films successfully',
        data: filmFind,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(film_id: number) {
    try {
      const film = await this.filmsRepository.findOne({
        where: { filmId: film_id },
      });
      if (!film) {
        throw new HttpException(
          {
            success: false,
            message: `Film with id ${film_id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        success: true,
        message: `Finding film with id ${film_id} successfully`,
        data: film,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    try {
      const film = await this.filmsRepository.findOne({
        where: { filmId: id },
      });
      if (!film) {
        throw new HttpException(
          {
            success: false,
            message: 'Film not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const language = await this.languagesService.findOne(
        updateFilmDto.languageId,
      );
      if (!language.data) {
        throw new HttpException(
          {
            success: false,
            message: 'Language not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.filmsRepository.update(id, updateFilmDto);
      return {
        success: true,
        message: 'Update film successfully',
        data: updateFilmDto,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async remove(id: number) {
  //   try {
  //     const film = this.filmsRepository.findOne({
  //       where: {filmId: id},
  //     });
  //     if (!film) {
  //       return {
  //         success: false,
  //         message: `Film with ID ${id} not found`,
  //         data: {}
  //       }
  //     }

  //     // await this.entityManager.getRepository(Inventory)
  //     // .createQueryBuilder().softDelete().where({filmId: id}).execute();

  //     // await this.filmsRepository.softDelete(id);

  //     // await this.entityManager.getRepository(Film)
  //     // .createQueryBuilder().softDelete().where({filmId: id}).execute();
  //     return {
  //       success: true,
  //       message: `Film with id ${id} has been deleted successfully.`,
  //     };
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }

  // }

  async countFilmByLanguageId(languageId: number): Promise<number> {
    return await this.filmsRepository.count({
      where: { languageId: languageId },
    });
  }
}
