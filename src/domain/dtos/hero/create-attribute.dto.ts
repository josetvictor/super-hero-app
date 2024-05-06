import { IsNotEmpty, IsNumber, isNumber } from "class-validator";

export class CreateAttributeDto {
    @IsNumber()
    @IsNotEmpty()
    superheroId: number;

    @IsNumber()
    @IsNotEmpty()
    attributeId: number;

    value: number;
}