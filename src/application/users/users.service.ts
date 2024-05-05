import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { BcryptService } from 'src/frameworks/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly bcryptService: BcryptService
  ) { }

  async create(createUserDto: CreateUserDto) {
      const userExistEmail = await this.findOneByEmail(createUserDto.email);
      const userExistCpf = await this.findOneByCpf(createUserDto.cpf);

      if (userExistEmail || userExistCpf) throw new ConflictException(null, 'User already exists!');

      createUserDto.password = await this.bcryptService.hash(createUserDto.password);

      const user = this.repository.create(createUserDto);
      return this.repository.save(user);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });

    const { password, ...result } = user;

    return result;
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

  async findOneByEmail(email: string) {
    return await this.repository.findOneBy({ email});
  }

  async findOneByCpf(cpf: string) {
    return await this.repository.findOneBy({ cpf });
  }
}
