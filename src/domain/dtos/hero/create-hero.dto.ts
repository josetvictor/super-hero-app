import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHeroDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    powerId: number;

    @IsNumber()
    attributeId: number;

    @IsString()
    @IsNotEmpty()
    publisher: string;
}