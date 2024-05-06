import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { IsNull } from "typeorm";

export class CreatePowerDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    superpowerId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    superheroId: number;
}