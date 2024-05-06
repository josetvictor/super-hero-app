import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHeroDto {

    @IsString()
    superhero_name: string;

    @IsString()
    full_name: string;

    @IsNumber()
    gender_id: number;

    @IsNumber()
    eye_colour_id: number;

    @IsNumber()
    hair_colour_id: number;

    @IsNumber()
    skin_colour_id: number;

    @IsNumber()
    race_id: number;

    @IsNumber()
    publisher_id: number;

    @IsNumber()
    alignment_id: number;

    @IsNumber()
    height_cm: number;

    @IsNumber()
    weight_kg: number;
}