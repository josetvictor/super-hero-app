import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../application/auth/auth.service';
import { AuthGuard } from '../application/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SingInDto } from 'src/domain/dtos/auth/singin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('singin')
  singIn(@Body() singInDto: SingInDto){
    return this.authService.singIn(singInDto.emailOrCpf, singInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@Body() singInDto: Record<string, any>){
    return this.authService.logout(singInDto.username);
  }
}
