import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    fistname: string;
    
    @IsString()
    lastname: string;
    
    @IsString()
    @IsNotEmpty()
    cpf: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isActive: boolean = true;
}
