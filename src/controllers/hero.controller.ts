import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
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
    async findAll() {
        return await this.heroService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.heroService.findOne(+id);
        if (!result) throw new NotFoundException();
        return result;
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