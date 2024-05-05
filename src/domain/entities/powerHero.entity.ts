import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hero } from "./hero.entity";

@Entity('powerHero')
export class PowerHero {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @ManyToOne(() => Hero, hero => hero.power)
    hero: Hero
}