import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hero } from "./hero.entity";

@Entity('attributeHero')
export class AttributeHero{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @ManyToOne(() => Hero, hero => hero.attribute)
    hero: Hero
}