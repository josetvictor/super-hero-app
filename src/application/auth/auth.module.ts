import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { FrameworksModule } from 'src/frameworks/frameworks.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    UsersModule,
    FrameworksModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [
    AuthService,
    JwtStrategy
    // se quiser privar todas as rotas do modulo adicione o codigo abaixo
    // {
    //   provide: 'APP_GUARD',
    //   useValue: AuthGuard
    // }
  ],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule {}
