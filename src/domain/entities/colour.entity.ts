import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Colour {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({length: 20 ,default: null})
    colour: string;

    @OneToMany(() => SuperHero, (hero) => {hero.eye_colour, hero.hair_colour, hero.skin_colour})
    heroes: SuperHero[];
}