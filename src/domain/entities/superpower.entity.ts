import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SuperHero } from "./superhero.entity";

@Entity('superpower')
export class SuperPower {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 200, nullable: true })
    powerName: string;

    @ManyToMany(() => SuperHero, { cascade: true })
    @JoinTable({ name: 'hero_power' })
    superHeros: SuperHero[]
}