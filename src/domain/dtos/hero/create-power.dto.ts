import { IsNotEmpty, IsNumber } from "class-validator";
import { IsNull } from "typeorm";

export class CreatePowerDto {

    @IsNumber()
    @IsNotEmpty()
    superpowerId: number;

    @IsNumber()
    @IsNotEmpty()
    superheroId: number;
}