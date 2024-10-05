import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { EntityManager, Repository } from 'typeorm';
import { Actor } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    private readonly entityManager: EntityManager){}

  async create(createActorDto: CreateActorDto) {
    const actor = new Actor(createActorDto);
    await this.entityManager.save(actor);
    return 'This action adds a new actor';
  }

  findAll() {
    return this.actorsRepository.find();
  }

  findOne(actor_id: number) {
    return this.actorsRepository.findOneBy({ actor_id });
  }

  async update(actor_id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.actorsRepository.findOneBy({actor_id});
    if(updateActorDto.first_name != actor.first_name || updateActorDto.first_name != "")
    {
      actor.first_name = updateActorDto.first_name;
    }
    if(updateActorDto.last_name != actor.last_name || updateActorDto.last_name != "")
    {
      actor.last_name = updateActorDto.last_name;
    }
    await this.entityManager.save(actor);

  }

  async remove(actor_id: number) {
    return this.actorsRepository.delete({actor_id});
  }
}
