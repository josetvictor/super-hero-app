import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AttributeHero } from "./attributeHero.entity";
import { PowerHero } from "./powerHero.entity";

@Entity('heros')
export class Hero {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => AttributeHero, (attribute) => attribute.hero)
    attribute : Array<AttributeHero>;

    @OneToMany(() => PowerHero, (power) => power.hero)
    power : Array<PowerHero>;

    @Column()
    publisher: string;
}