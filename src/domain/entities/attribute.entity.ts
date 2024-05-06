import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HeroAttribute } from "./heroAttribute.entity";

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({length: 200, default: null})
    attribute_name: string;

    @OneToMany(() => HeroAttribute, (heroAttributes) => heroAttributes.attribute)
    heroAttributes: HeroAttribute[];
}