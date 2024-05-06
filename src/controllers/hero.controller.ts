import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { query } from "express";
import { HeroService } from "src/application/hero/hero.service";
import { CreateHeroDto } from "src/domain/dtos/hero/create-hero.dto";
import { UpdateHeroDto } from "src/domain/dtos/hero/update-hero.dto";

@ApiTags('Heros')
@Controller('Heros')
export class HeroController {
    constructor(private readonly heroService: HeroService) { }

    @Post()
    async create(@Body() createHeroDto: CreateHeroDto) {
        const result = await this.heroService.create(createHeroDto);

        if (!result) throw new BadRequestException();

        return result;
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('order') order: string = 'DESC'
    ) {
        return await this.heroService.findAll(page, pageSize, order);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
        const result = await this.heroService.update(+id, updateHeroDto);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        const result = await this.heroService.remove(+id);
    }
}