import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/Actor';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createActorDto: CreateActorDto) {
    const actor = new Actor(createActorDto);
    try {
      await this.entityManager.save(actor);
      return {
        success: true,
        message: 'Create actor successfully',
        data: actor,
      };
    } catch (error) {
      // throw new Error(`Failed to create actor: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const resFind = await this.actorsRepository.find();
      return {
        success: true,
        message: 'Find all actors successfully.',
        data: resFind,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(actor_id: number) {
    try {
      const actor = await this.actorsRepository.findOne({
        where: { actorId: actor_id },
      });
      if (!actor) {
        throw new HttpException(
          {
            success: false,
            message: `Actor with id ${actor_id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        success: true,
        message: `Finding actor with id ${actor_id} successfully`,
        data: actor,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(actor_id: number, updateActorDto: UpdateActorDto) {
    try {
      const actor = await this.actorsRepository.findOneBy({
        actorId: actor_id,
      });
      Object.assign(actor, updateActorDto);
      await this.actorsRepository.update(actor_id, actor);
      return {
        success: true,
        message: 'Update actor successfully',
        data: actor,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(actor_id: number) {
    try {
      const actor = await this.actorsRepository.findOneBy({
        actorId: actor_id,
      });

      if (!actor) {
        throw new HttpException(
          {
            success: false,
            message: `Actor with id ${actor_id} does not exist`,
            data: {},
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.entityManager.delete('film_actor', { actor_id: actor_id });
      await this.actorsRepository.delete({ actorId: actor_id });

      return {
        success: true,
        message: `Actor with ID ${actor_id} has been removed successfully`,
        data: {},
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
