import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AccessToken } from 'src/domain/dtos/user/accessToken.dto';
import { User } from 'src/domain/entities/user.entity';
import { BcryptService } from 'src/frameworks/bcrypt.service';
import { SingInDto } from 'src/domain/dtos/auth/singin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly bcryptService: BcryptService
  ) { }

  async singIn(emailOrCpf: string, password: string): Promise<AccessToken> {
    const user = await this.validateUser({ emailOrCpf, password });

    return this.gerateToken(user);
  }

  async logout(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async validateUser(singIn: SingInDto): Promise<User> {
    let user: User;

    const isCpf = (/^\d+$/).test(singIn.emailOrCpf) === null;
    if (isCpf) {
      user = await this.userService.findOneByCpf(singIn.emailOrCpf);
    } else {
      user = await this.userService.findOneByEmail(singIn.emailOrCpf);
    }

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswrod = await this.bcryptService.compare(singIn.password, user.password);
    if (isPasswrod) {
      throw new UnauthorizedException('User or password invalid');
    }

    return user;
  }

  async gerateToken(user: User) {

    const payload = {
      sub: user.id,
      email: user.email
    }
    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = this.jwtService.sign(
      payload,
      {
        secret: 'sua-chave-refresh',
        expiresIn: '120s',
      },
    );

    return { accessToken, refreshToken };
  }

  async reautenticar(body) {
    const payload: User = await this.verificarRefreshToken(body);
    return this.gerateToken(payload);
  }

  private async verificarRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.userService.findOneByEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: 'sua-chave-refresh',
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
