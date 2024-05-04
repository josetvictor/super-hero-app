import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async singIn(username: string, password: string): Promise<{ id: number, username: string, accessToken: string }>{
    const user = await this.userService.findOneByUsername(username);
    
    if(!user) {
      throw new NotFoundException();
    }

    if((user?.password !== password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user?.id, username: user?.username };
    return {
      id: user?.id,
      username: user?.username,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async detailsUser(id: number) {
    return this.userService.findOne(id);
  }
}
