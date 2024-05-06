import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHeroDto } from 'src/domain/dtos/hero/create-hero.dto';
import { UpdateHeroDto } from 'src/domain/dtos/hero/update-hero.dto';
import { SuperHero } from 'src/domain/entities/superhero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(SuperHero)
        private readonly repository: Repository<SuperHero>
    ) { }


    async findAll(): Promise<SuperHero[]> {
        var result = await this.repository.find();

        if (!result) {
            throw new NotFoundException(`Hero not found`);
        }
        
        return result;
    }

    async findOne(id: number): Promise<SuperHero> {
        const hero = await this.repository.findOneBy({ id });
        if (!hero) {
            throw new NotFoundException(`Hero #${id} not found`);
        }
        return hero;
    }

    async create(createHeroDto: CreateHeroDto): Promise<SuperHero> {
        const hero = this.repository.create(createHeroDto);

        return await this.repository.save(hero);
    }

    async update(id: number, updateHeroDto: UpdateHeroDto): Promise<SuperHero> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;
        this.repository.merge(hero, updateHeroDto);
        return this.repository.save(hero);
    }

    async remove(id: number): Promise<void> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;

        await this.repository.remove(hero);
    }
}
