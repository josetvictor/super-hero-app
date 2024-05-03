import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async singIn(username: string, password: string): Promise<{ accessToken: string }>{
    const user = await this.userService.findOne(username);
    if((user?.password !== password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.userId, username: user?.username };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async detailsUser(id: number) {
    return this.userService.findById(id);
  }
}
