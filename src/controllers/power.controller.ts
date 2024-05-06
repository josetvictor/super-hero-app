import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PowerHeroService } from "src/application/hero/power-hero.service";
import { CreatePowerDto } from "src/domain/dtos/hero/create-power.dto";
import { UpdatePowerDto } from "src/domain/dtos/hero/update-power.dto";

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
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

    @Get(':id')
    async findAll(@Param('id') id: number) {
        return await this.powerService.findAllPowerToHero(id);
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