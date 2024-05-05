import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken } from 'src/domain/dtos/user/accessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async singIn(email: string, password: string): Promise<AccessToken>{
    const user = await this.userService.findOneByEmail(email);
    
    if(!user) {
      throw new NotFoundException();
    }

    if((user?.password !== password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.id, username: user?.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async logout(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
