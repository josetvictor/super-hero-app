import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";
import { Attribute } from "./attribute.entity";

@Entity('hero_attribute')
export class HeroAttribute {
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'int', default: null})
    value: number;

    @ManyToOne(() => Attribute, (attribute) => attribute.heroAttributes)
    attribute: Attribute

    @ManyToOne(() => SuperHero, (hero) => hero.heroAttributes)
    superhero: SuperHero
}