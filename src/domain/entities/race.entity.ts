import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Race {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 100, default: null})
    race: string;

    @OneToMany(() => SuperHero, (hero) => hero.race)
    heroes: SuperHero[];
}