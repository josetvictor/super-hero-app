import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken } from 'src/domain/dtos/user/accessToken.dto';
import { User } from 'src/domain/entities/user.entity';
import { BcryptService } from 'src/frameworks/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) {}

  async singIn(emailOrCpf: string, password: string): Promise<AccessToken>{
    let user: User; 
    let payload;
    // Testa se o emailOrCpf é um número inteiro (contém apenas dígitos).
    // Utiliza a expressão regular /^\d+$/ que procura a string começo (^) ate o final ($)
    // de emailOrCpf, e se ela contém apenas dígitos (\d+)
    const isCpf = (/^\d+$/).test(emailOrCpf) === null;
    if(isCpf) {
      user = await this.userService.findOneByCpf(emailOrCpf);
      payload = { sub: user?.id, cpf: user?.cpf };
    } else {
      user = await this.userService.findOneByEmail(emailOrCpf);
      payload = { sub: user?.id, email: user?.email };
    }
    
    if(!user) {
      throw new NotFoundException();
    }

    const isPasswrod = await this.bcryptService.compare(password, user.password);
    if(isPasswrod) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async logout(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
