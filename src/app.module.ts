import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';

import { 
  UsersController,
  AuthController,
  HeroController,
  AttributeController,
  PowerController,
} from './controllers';

import { 
  UsersModule,
  AuthModule,
  HeroModule,
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
    FrameworksModule,
    AuthModule,
    UsersModule,
    HeroModule,
  ],
  controllers: [
    UsersController,
    AuthController,
    HeroController,
    AttributeController,
    PowerController
  ],
  providers: [],
})
export class AppModule { }
