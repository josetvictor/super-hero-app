import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePowerDto } from 'src/domain/dtos/hero/create-power.dto';
import { UpdatePowerDto } from 'src/domain/dtos/hero/update-power.dto';
import { SuperPower } from 'src/domain/entities/superpower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PowerHeroService {
    constructor(
        @InjectRepository(SuperPower)
        private readonly repository: Repository<SuperPower>
    ) { }


    async findAll(): Promise<SuperPower[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<SuperPower> {
        const hero = await this.repository.findOneBy({ id });
        if (!hero) {
            throw new NotFoundException(`Power #${id} not found`);
        }
        return hero;
    }

    async create(createPowerDto: CreatePowerDto): Promise<SuperPower> {
        const hero = this.repository.create(createPowerDto);

        return await this.repository.save(hero);
    }

    async update(id: number, updatePowerDto: UpdatePowerDto): Promise<SuperPower> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;
        this.repository.merge(hero, updatePowerDto);
        return this.repository.save(hero);
    }

    async remove(id: number): Promise<void> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;

        await this.repository.remove(hero);
    }
}
