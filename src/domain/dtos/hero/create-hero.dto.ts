import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateHeroDto {

    @IsString()
    superhero_name: string;

    @IsString()
    full_name: string;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    genderId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    eyeColourId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    hairColourId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    skinColourId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    raceId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    publisherId!: number | null;

    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    alignmentId!: number | null;

    @IsNumber()
    height_cm: number;

    @IsNumber()
    weight_kg: number;
}