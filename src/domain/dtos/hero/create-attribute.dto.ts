import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber } from "class-validator";

export class CreateAttributeDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    superheroId: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    attributeId: number;
    
    @ApiProperty({required: false})
    value: number;
}