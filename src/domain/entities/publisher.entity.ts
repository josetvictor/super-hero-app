import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Publisher {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 50, default: null})
    publisher_name: string;

    @OneToMany(() => SuperHero, (hero) => hero.publisher)
    heroes: SuperHero[];
}