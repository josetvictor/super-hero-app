import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttributeDto } from 'src/domain/dtos/hero/create-attribute.dto';
import { UpdateAttributeDto } from 'src/domain/dtos/hero/update-attribute.dto';
import { Attribute } from 'src/domain/entities/attribute.entity';
import { HeroAttribute } from 'src/domain/entities/heroAttribute.entity';
import { SuperHero } from 'src/domain/entities/superhero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AtrributeHeroService {
    constructor(
        @InjectRepository(Attribute)
        private readonly _repository: Repository<Attribute>,
        @InjectRepository(HeroAttribute)
        private readonly _HeroAttributeRepository: Repository<HeroAttribute>,
        @InjectRepository(SuperHero)
        private readonly _SuperHeroRepository: Repository<SuperHero>
    ) { }


    async findAllAtributesForHero(heroId: number): Promise<HeroAttribute[]> {
        return await this._HeroAttributeRepository.find({
            relations: {
                attribute: true
            },
            select: {
                attribute: {
                    id: true,
                    attribute_name: true
                },
                value: true
            },
            where: {
                superhero: {
                    id: heroId
                },
            }
        });
    }

    async create(createAttributeDto: CreateAttributeDto): Promise<HeroAttribute> {
        const attributeHero = await this._HeroAttributeRepository.findOne({
            where: {
                superhero: {
                    id: createAttributeDto.superheroId
                },
                attribute: {
                    id: createAttributeDto.attributeId
                }
            }
        });

        if(attributeHero) throw new NotFoundException(`Hero #${createAttributeDto.superheroId} already has this attribute`);

        const newAttributeHero = this._HeroAttributeRepository.create(createAttributeDto);

        newAttributeHero.superhero = await this._SuperHeroRepository.findOneBy({ id: createAttributeDto.superheroId });
        newAttributeHero.attribute = await this._repository.findOneBy({ id: createAttributeDto.attributeId });
        
        return await this._HeroAttributeRepository.save(newAttributeHero);
    }

    async update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<HeroAttribute> {
        const attributeHero = await this._HeroAttributeRepository.findOneBy({ id});

        if(!attributeHero) throw new NotFoundException();

        if(updateAttributeDto.superheroId) attributeHero.superhero = await this._SuperHeroRepository.findOneBy({ id: updateAttributeDto.superheroId });
        if(updateAttributeDto.attributeId) attributeHero.attribute = await this._repository.findOneBy({ id: updateAttributeDto.attributeId });
        
        return await this._HeroAttributeRepository.save(attributeHero);
    }

    async remove(id: number): Promise<void> {
        const hero = await this._repository.findOneBy({ id });

        if (!hero) return null;

        await this._repository.remove(hero);
    }
}
