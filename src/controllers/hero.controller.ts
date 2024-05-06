import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { HeroService } from "src/application/hero/hero.service";
import { CreateHeroDto } from "src/domain/dtos/hero/create-hero.dto";
import { UpdateHeroDto } from "src/domain/dtos/hero/update-hero.dto";

@UseGuards(AuthGuard('jwt'))
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

    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'order', required: false, type: String, example: 'ASC' })
    @ApiQuery({ name: 'attributeId', required: false, type: Number })
    @ApiQuery({ name: 'publisherId', required: false, type: Number })
    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('order') order: string = 'DESC',
        @Query('attributeId') attributeId?: number,
        @Query('publisherId') publisherId?: number
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