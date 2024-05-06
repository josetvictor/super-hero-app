import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateHeroDto {

    @IsString()
    superhero_name: string;

    @IsString()
    full_name: string;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    gender_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    eye_colour_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    hair_colour_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    skin_colour_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    race_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    publisher_id!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    alignment_id!: number | null;

    @IsNumber()
    height_cm: number;

    @IsNumber()
    weight_kg: number;
}