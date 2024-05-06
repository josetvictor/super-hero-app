import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAttributeDto } from 'src/domain/dtos/hero/create-attribute.dto';
import { UpdateAttributeDto } from 'src/domain/dtos/hero/update-attribute.dto';
import { Attribute } from 'src/domain/entities/attribute.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AtrributeHeroService {
    constructor(
        @InjectRepository(Attribute)
        private readonly repository: Repository<Attribute>
    ) { }


    async findAll(): Promise<Attribute[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<Attribute> {
        const hero = await this.repository.findOneBy({ id });
        if (!hero) {
            throw new NotFoundException(`Attribute #${id} not found`);
        }
        return hero;
    }

    async create(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
        const hero = this.repository.create(createAttributeDto);

        return await this.repository.save(hero);
    }

    async update(id: number, updateAttributeDto: UpdateAttributeDto): Promise<Attribute> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;
        this.repository.merge(hero, updateAttributeDto);
        return this.repository.save(hero);
    }

    async remove(id: number): Promise<void> {
        const hero = await this.repository.findOneBy({ id });

        if (!hero) return null;

        await this.repository.remove(hero);
    }
}
