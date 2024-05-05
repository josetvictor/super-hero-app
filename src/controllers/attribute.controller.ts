import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AtrributeHeroService } from "src/application/hero/atrribute-hero.service";
import { CreateAttributeDto } from "src/domain/dtos/hero/create-attribute.dto";
import { UpdateAttributeDto } from "src/domain/dtos/hero/update-attribute.dto";

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

    @Get()
    async findAll() {
        return await this.attributeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.attributeService.findOne(+id);
        if (!result) throw new NotFoundException();
        return result;
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