import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHeroDto } from 'src/domain/dtos/hero/create-hero.dto';
import { UpdateHeroDto } from 'src/domain/dtos/hero/update-hero.dto';
import { Hero } from 'src/domain/entities/hero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(Hero)
        private readonly repository: Repository<Hero>
    ) { }


    async findAll(): Promise<Hero[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<Hero> {
        const hero = await this.repository.findOneBy({ id });
        if (!hero) {
            throw new NotFoundException(`Hero #${id} not found`);
        }
        return hero;
    }

    async create(createHeroDto: CreateHeroDto): Promise<Hero> {
        const hero = this.repository.create(createHeroDto);

        return await this.repository.save(hero);
    }

    async update(id: number, updateHeroDto: UpdateHeroDto): Promise<Hero> {
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
