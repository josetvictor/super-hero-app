import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('singin')
  singIn(@Body() singInDto: Record<string, any>){
    return this.authService.singIn(singInDto.username, singInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logOut(@Body() singInDto: Record<string, any>){
    return this.authService.logout(singInDto.username);
  }
}
