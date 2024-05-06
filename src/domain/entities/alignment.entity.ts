import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Alignment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 10, default: null})
    alignment: string;

    @OneToMany(() => SuperHero, (hero) => hero.alignment)
    heroes: SuperHero[];
}