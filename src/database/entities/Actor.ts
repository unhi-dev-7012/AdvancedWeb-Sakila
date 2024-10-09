import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Film } from "./Film";
// import { FilmActor } from "./FilmActor";


@Index("actor_pkey", ["actorId"], { unique: true })
@Entity("actor", { schema: "public" })
export class Actor {
  @PrimaryGeneratedColumn({ type: "integer", name: "actor_id" })
  actorId: number;

  @Column("character varying", { name: "first_name", length: 45 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 45 })
  lastName: string;

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;


  @ManyToMany(() => Film, (film) => film.actors) // Thiết lập mối quan hệ với Film
  films: Film[];

  constructor(actor: Partial<Actor>)
  {
    Object.assign(this, actor);
  }

}
