import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePowerDto } from 'src/domain/dtos/hero/create-power.dto';
import { UpdatePowerDto } from 'src/domain/dtos/hero/update-power.dto';
import { SuperHero } from 'src/domain/entities/superhero.entity';
import { SuperPower } from 'src/domain/entities/superpower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PowerHeroService {
    constructor(
        @InjectRepository(SuperPower)
        private readonly _repository: Repository<SuperPower>,
        @InjectRepository(SuperHero)
        private readonly _superheroRepository: Repository<SuperHero>
    ) { }


    async findAllPowerToHero(heroId: number): Promise<SuperPower[]> {
        return await this._repository.find({
            where: {
                superHeros: {
                    id: heroId
                }
            }
        });
    }

    async create(createPowerDto: CreatePowerDto): Promise<SuperPower> {
        const powerHero = await this._repository.findOne({
            where: {
                id: createPowerDto.superpowerId,
                superHeros: {
                    id: createPowerDto.superheroId
                }
            }
        });

        if(powerHero) throw new NotFoundException(`Hero #${createPowerDto.superheroId} already has this power`);

        const superPower = await this._repository.findOneBy({ id: createPowerDto.superpowerId });
        superPower.superHeros = await this._superheroRepository.find({
            where: {
                id: createPowerDto.superheroId
            }
        });

        return await this._repository.save(superPower);
    }

    async update(id: number, updatePowerDto: UpdatePowerDto): Promise<SuperPower> {
        const superPower = await this._repository.findOneBy({ id });

        if (!superPower) throw new NotFoundException("Hero not found");

        superPower.superHeros = await this._superheroRepository.find({
            where: {
                id: updatePowerDto.superheroId
            }
        })

        return this._repository.save(superPower);
    }

    async remove(id: number): Promise<void> {
        const hero = await this._repository.findOneBy({ id });

        if (!hero) return null;

        await this._repository.remove(hero);
    }
}
