import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { FrameworksModule } from 'src/frameworks/frameworks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    FrameworksModule
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
