import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.entity";
import { Colour } from "./colour.entity";
import { Race } from "./race.entity";
import { Publisher } from "./publisher.entity";
import { Alignment } from "./alignment.entity";
import { HeroAttribute } from "./heroAttribute.entity";

@Entity('superhero')
export class SuperHero {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({length: 200, default: null})
    superhero_name: string;

    @Column({length: 200, default: null})
    full_name: string;

    @ManyToOne(() => Gender, (gender) => gender.heroes)
    gender: Gender;

    @ManyToOne(() => Colour, (colour) => colour.heroes)
    eye_colour: Colour;

    @ManyToOne(() => Colour, (colour) => colour.heroes)
    hair_colour: Colour;

    @ManyToOne(() => Colour, (colour) => colour.heroes)
    skin_colour: Colour;

    @ManyToOne(() => Race, (race) => race.heroes)
    race: Race;

    @ManyToOne(() => Publisher, (publisher) => publisher.heroes)
    publisher: Publisher;

    @ManyToOne(() => Alignment, (alignment) => alignment.heroes)
    alignment: Alignment;

    @OneToMany(() => HeroAttribute, (heroAttributes) => heroAttributes.superhero)
    heroAttributes: HeroAttribute[];

    @Column({default: null})
    height_cm: number;

    @Column({default: null})
    weight_kg: number;
}
