import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Colour } from "./colour.entity";
import { Race } from "./race.entity";
import { Publisher } from "./publisher.entity";
import { Alignment } from "./alignment.entity";
import { HeroAttribute } from "./heroAttribute.entity";
import { Gender } from "./gender.entity";

@Entity('superhero')
export class SuperHero {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 200, default: null })
    superhero_name: string;

    @Column({ length: 200, default: null })
    full_name: string;

    @ManyToOne(() => Gender, (gender) => gender.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    gender: Gender;

    @ManyToOne(() => Colour, (colour) => colour.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    eye_colour: Colour;

    @ManyToOne(() => Colour, (colour) => colour.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    hair_colour: Colour;

    @ManyToOne(() => Colour, (colour) => colour.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    skin_colour: Colour;

    @ManyToOne(() => Race, (race) => race.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    race: Race;

    @ManyToOne(() => Publisher, (publisher) => publisher.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    publisher: Publisher;

    @ManyToOne(() => Alignment, (alignment) => alignment.heroes, {
        cascade: ['insert', 'update', 'remove']
    })
    alignment: Alignment;

    @OneToMany(() => HeroAttribute, (heroAttributes) => heroAttributes.superhero)
    heroAttributes: HeroAttribute[];

    @Column({ default: null })
    height_cm: number;

    @Column({ default: null })
    weight_kg: number;
}
