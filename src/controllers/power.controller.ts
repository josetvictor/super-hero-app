import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PowerHeroService } from "src/application/hero/power-hero.service";
import { CreatePowerDto } from "src/domain/dtos/hero/create-power.dto";
import { UpdatePowerDto } from "src/domain/dtos/hero/update-power.dto";

@ApiTags('Powers')
@Controller('Power')
export class PowerController {
    constructor(private readonly powerService: PowerHeroService) { }

    @Post()
    async create(@Body() createPowerDto: CreatePowerDto) {
        const result = await this.powerService.create(createPowerDto);

        if (!result) throw new BadRequestException();

        return result;
    }

    @Get()
    async findAll() {
        return await this.powerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.powerService.findOne(+id);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePowerDto: UpdatePowerDto) {
        const result = await this.powerService.update(+id, updatePowerDto);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        const result = await this.powerService.remove(+id);
    }
}