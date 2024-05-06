import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AtrributeHeroService } from "src/application/hero/atrribute-hero.service";
import { CreateAttributeDto } from "src/domain/dtos/hero/create-attribute.dto";
import { UpdateAttributeDto } from "src/domain/dtos/hero/update-attribute.dto";

@UseGuards(AuthGuard('jwt'))
@ApiTags('Attributes')
@Controller('Attributes')
export class AttributeController {
    constructor(private readonly attributeService: AtrributeHeroService) { }

    @Post()
    async create(@Body() createAttributeDto: CreateAttributeDto) {
        const result = await this.attributeService.create(createAttributeDto);

        if (!result) throw new BadRequestException();

        return result;
    }

    @Get(':id')
    async findAllAttributesForHero(@Param('id') id: number) {
        return await this.attributeService.findAllAtributesForHero(id);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
        const result = await this.attributeService.update(+id, updateAttributeDto);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        const result = await this.attributeService.remove(+id);
    }
}