import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstantes } from './constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstantes.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // se quiser privar todas as rotas do modulo adicione o codigo abaixo
    // {
    //   provide: 'APP_GUARD',
    //   useValue: AuthGuard
    // }
  ],
  exports: [AuthService]
})
export class AuthModule {}
