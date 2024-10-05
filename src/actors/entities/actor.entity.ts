import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {
    @PrimaryGeneratedColumn({
        type: 'integer', 
        name: 'actor_id',
    })
    actor_id: number;

    @Column({
        type: 'varchar', 
        length: 45,
        nullable: false,
        name: 'first_name'
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 45,
        nullable: false,
        name: 'last_name'
    })
    last_name: string;


    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false,
        name: 'last_update'
    })
    last_update: Date;

    constructor(actor: Partial<Actor>)
    {
        Object.assign(this, actor);
    }
}
