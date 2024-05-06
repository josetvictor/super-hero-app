import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHeroDto } from 'src/domain/dtos/hero/create-hero.dto';
import { UpdateHeroDto } from 'src/domain/dtos/hero/update-hero.dto';
import { Alignment } from 'src/domain/entities/alignment.entity';
import { Attribute } from 'src/domain/entities/attribute.entity';
import { Colour } from 'src/domain/entities/colour.entity';
import { Gender } from 'src/domain/entities/gender.entity';
import { Publisher } from 'src/domain/entities/publisher.entity';
import { Race } from 'src/domain/entities/race.entity';
import { SuperHero } from 'src/domain/entities/superhero.entity';
import { SuperPower } from 'src/domain/entities/superpower.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(SuperHero)
        private readonly _repository: Repository<SuperHero>,
        @InjectRepository(Alignment)
        private readonly _alignmentRepository: Repository<Alignment>,
        @InjectRepository(Colour)
        private readonly _colourRepository: Repository<Colour>,
        @InjectRepository(Gender)
        private readonly _genderRepository: Repository<Gender>,
        @InjectRepository(Publisher)
        private readonly _publisherRepository: Repository<Publisher>,
        @InjectRepository(Race)
        private readonly _raceRepository: Repository<Race>
    ) { }


    async findAll(): Promise<SuperHero[]> {
        var result = await this._repository.find();

        if (!result) {
            throw new NotFoundException(`Hero not found`);
        }
        
        return result;
    }

    async create(createHeroDto: CreateHeroDto): Promise<SuperHero> {
        const result = await this._repository.findOneBy({ superhero_name: createHeroDto.superhero_name });

        if(result) throw new NotFoundException(`Hero #${createHeroDto.superhero_name} already exists`);

        const hero = this._repository.create(createHeroDto);

        if (createHeroDto.alignmentId !== null) hero.alignment = await this._alignmentRepository.findOneBy({ id: createHeroDto.alignmentId });
        if (createHeroDto.genderId !== null) hero.gender = await this._genderRepository.findOneBy({ id: createHeroDto.genderId });
        if (createHeroDto.publisherId !== null) hero.publisher = await this._publisherRepository.findOneBy({ id: createHeroDto.publisherId });
        if (createHeroDto.raceId !== null) hero.race = await this._raceRepository.findOneBy({ id: createHeroDto.raceId });
        if (createHeroDto.eyeColourId !== null) hero.eye_colour = await this._colourRepository.findOneBy({ id: createHeroDto.eyeColourId });
        if (createHeroDto.hairColourId !== null) hero.hair_colour = await this._colourRepository.findOneBy({ id: createHeroDto.hairColourId });
        if (createHeroDto.skinColourId !== null) hero.skin_colour = await this._colourRepository.findOneBy({ id: createHeroDto.skinColourId });

        return await this._repository.save(hero);
    }

    async update(id: number, updateHeroDto: UpdateHeroDto): Promise<SuperHero> {
        const hero = await this._repository.findOneBy({ id });

        
        if (!hero) throw new BadRequestException("Hero not found");
        
        if (updateHeroDto.alignmentId) hero.alignment = await this._alignmentRepository.findOneBy({ id: updateHeroDto.alignmentId });
        if (updateHeroDto.genderId) hero.gender = await this._genderRepository.findOneBy({ id: updateHeroDto.genderId });
        if (updateHeroDto.publisherId) hero.publisher = await this._publisherRepository.findOneBy({ id: updateHeroDto.publisherId });
        if (updateHeroDto.raceId) hero.race = await this._raceRepository.findOneBy({ id: updateHeroDto.raceId });
        if (updateHeroDto.eyeColourId) hero.eye_colour = await this._colourRepository.findOneBy({ id: updateHeroDto.eyeColourId });
        if (updateHeroDto.hairColourId) hero.hair_colour = await this._colourRepository.findOneBy({ id: updateHeroDto.hairColourId });
        if (updateHeroDto.skinColourId) hero.skin_colour = await this._colourRepository.findOneBy({ id: updateHeroDto.skinColourId });
        
        return this._repository.save(hero);
    }

    async remove(id: number): Promise<void> {
        const hero = await this._repository.findOneBy({ id });

        if (!hero) return null;

        await this._repository.remove(hero);
    }
}
