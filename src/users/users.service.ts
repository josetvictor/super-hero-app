import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
      const userExist = await this.repository.findOneBy({ username: createUserDto.username });

      if (userExist) throw new ConflictException(null, 'User already exists!');

      const user = this.repository.create(createUserDto);
      return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) return null;

    this.repository.merge(user, updateUserDto);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.repository.findOneBy({ id });

    if (!user) return null;

    return this.repository.remove(user);
  }
}
