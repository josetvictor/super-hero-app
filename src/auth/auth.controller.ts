import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  singIn(@Body() singInDto: Record<string, any>){
    return this.authService.singIn(singInDto.username, singInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile/:id')
  async getProfile(@Request() request){
    var result = await this.authService.detailsUser(request.user.id);
    return result; 
  }
}
