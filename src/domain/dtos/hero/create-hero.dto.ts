import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";

export class CreateHeroDto {

    @ApiProperty()
    @IsString()
    superhero_name: string;

    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    genderId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    eyeColourId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    hairColourId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    skinColourId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    raceId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    publisherId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    @ValidateIf((object, value) => value !== null)
    alignmentId!: number | null;

    @ApiProperty({required: false})
    @IsNumber()
    height_cm: number;

    @ApiProperty({required: false})
    @IsNumber()
    weight_kg: number;
}