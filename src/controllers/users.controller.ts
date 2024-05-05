import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/application/users/users.service';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { UpdateUserDto } from 'src/domain/dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
      const result = await this.usersService.create(createUserDto);
      
      if (!result) throw new BadRequestException();

      const { password, ...rest } = result;
      return rest;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.usersService.findOne(+id);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(+id, updateUserDto);
    if (!result) throw new NotFoundException();
    return result;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(+id);
    if (!result) throw new NotFoundException();
  }
}
