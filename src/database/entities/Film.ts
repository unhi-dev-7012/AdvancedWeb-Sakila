import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Actor } from "./Actor";
import { FilmCategory } from "./FilmCategory";
import { Inventory } from "./Inventory";
import { Language } from "./Language";

export enum MpaaRating {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG-13',
  R = 'R',
  NC17 = 'NC-17',
}

@Index("film_pkey", ["filmId"], { unique: true })
@Index("film_fulltext_idx", ["fulltext"], {})
@Index("idx_fk_language_id", ["languageId"], {})
@Index("idx_fk_original_language_id", ["originalLanguageId"], {})
@Index("idx_title", ["title"], {})
@Entity("film", { schema: "public" })
export class Film {
  @PrimaryGeneratedColumn({ type: "integer", name: "film_id" })
  filmId: number;

  @Column("character varying", { name: "title", length: 255  })
  title: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "release_year", nullable: true })
  releaseYear: number | null;

  @Column("integer", { name: "language_id" })
  languageId: number;

  @Column("integer", { name: "original_language_id", nullable: true })
  originalLanguageId: number | null;

  @Column("smallint", { name: "rental_duration", default: () => "3" })
  rentalDuration: number;

  @Column("numeric", {
    name: "rental_rate",
    precision: 4,
    default: () => "4.99",
  })
  rentalRate: number;

  @Column("smallint", { name: "length", nullable: false})
  length: number | undefined;

  @Column("numeric", {
    name: "replacement_cost",
    scale: 2,
    default: () => "19.99",
  })
  replacementCost: number;

  @Column({
        type: 'enum',  // Set the type to 'enum'
        enumName: 'MpaaRating',  // Use the defined enum
        default: MpaaRating.G,  // Set the default value using the enum
        nullable: false,
    })
    rating: MpaaRating | null;  // Change type to the enum

  @Column("timestamp without time zone", {
    name: "last_update",
    default: () => "now()",
  })
  lastUpdate: Date;

  @Column("text", { name: "special_features", nullable: true, array: true })
  specialFeatures: string[] | null;

  @Column("tsvector", { name: "fulltext" })
  fulltext: string;

  @ManyToMany(() => Actor, (actor) => actor.films, {cascade: true})
  @JoinTable({
      name: "film_actor", // table name for the junction table of this relation
      joinColumn: {
          name: "film_id",
          foreignKeyConstraintName: "film_actor_film_id_fkey",
          referencedColumnName: "filmId"
      },
      inverseJoinColumn: {
          name: "actor_id",
          foreignKeyConstraintName: "film_actor_actor_id_fkey",
          referencedColumnName: "actorId"
      }
  })
  actors: Actor[];

  @ManyToOne(() => Language, (language) => language.films, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "language_id", referencedColumnName: "languageId" }])
  language: Language;

  @ManyToOne(() => Language, (language) => language.films2, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    { name: "original_language_id", referencedColumnName: "languageId" },
  ])
  originalLanguage: Language;

  @OneToMany(() => FilmCategory, (filmCategory) => filmCategory.film)
  filmCategories: FilmCategory[];

  @OneToMany(() => Inventory, (inventory) => inventory.film)
  inventories: Inventory[];

  constructor(film: Partial<Film>)
  {
    Object.assign(this, film);
  }

}
