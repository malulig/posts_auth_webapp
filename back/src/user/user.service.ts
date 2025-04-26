import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isMatchUser = await this.userRepo.findOneBy({
      username: createUserDto.username,
    });

    if (isMatchUser) throw new Error('Юзер с таким логином уже есть');

    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.userRepo.findOneBy({ id });
  }

  async findOneByUserName(username: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ username });
  }

  async remove(id: number): Promise<number> {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) throw new NotFoundException(' User not found ');

    await this.userRepo.delete({ id });
    return id;
  }
}
