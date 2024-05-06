import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity()
export class Comic {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({length: 200, default: null})
    comic_name: string;

    @Column({default: null})
    issue: number;

    @Column({default: null})
    publish_month: number;

    @Column({default: null})
    publish_year: number;
}