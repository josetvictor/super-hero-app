import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Gender {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({length: 20, default: null})
    gender: string;

    @OneToMany(() => SuperHero, (hero) => hero.gender)
    heroes: SuperHero[];
}