import { ApiProperty } from "@nestjs/swagger";

export class SingInDto {
    @ApiProperty()
    emailOrCpf: string;

    @ApiProperty()
    password: string;
}