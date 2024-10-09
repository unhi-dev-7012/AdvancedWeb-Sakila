import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'src/database/entities/Actor';



@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    private readonly entityManager: EntityManager){}

  async create(createActorDto: CreateActorDto) {
    const actor = new Actor(createActorDto);
    try {
        await this.entityManager.save(actor);
        return 'This action adds a new actor';
    } catch (error) {
        throw new Error(`Failed to create actor: ${error.message}`);
    }
}

  findAll() {
    return this.actorsRepository.find();
  }

  findOne(actor_id: number) {
    return this.actorsRepository.findOne({
      where: {actorId: actor_id},
      relations: ['films']
    });
  }

  async update(actor_id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.actorsRepository.findOneBy({actorId: actor_id});
    if(updateActorDto.firstName != actor.firstName || updateActorDto.firstName != "")
    {
      actor.firstName = updateActorDto.firstName;
    }
    if(updateActorDto.lastName != actor.lastName || updateActorDto.lastName != "")
    {
      actor.lastName = updateActorDto.lastName;
    }
    await this.entityManager.save(actor);

  }

  async remove(actor_id: number) {
    const actor = await this.actorsRepository.findOneBy({ actorId: actor_id });

    if (!actor) {
      throw new Error(`Actor with ID ${actor_id} not found`);
    }

    await this.entityManager.delete('film_actor', { actor_id: actor_id });

    try {
      await this.actorsRepository.delete({ actorId: actor_id });
      return `Actor with ID ${actor_id} has been removed successfully`;
    } catch (error) {
      throw new Error(`Failed to remove actor: ${error.message}`);
    }
  }
}
