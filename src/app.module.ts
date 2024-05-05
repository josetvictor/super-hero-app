import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';

import { 
  UsersController,
  AuthController
} from './controllers';

import { 
  UsersModule,
  AuthModule
 } from './application';
import { FrameworksModule } from './frameworks/frameworks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    AuthModule,
    UsersModule,
    FrameworksModule,
  ],
  controllers: [
    UsersController,
    AuthController
  ],
  providers: [],
})
export class AppModule { }
