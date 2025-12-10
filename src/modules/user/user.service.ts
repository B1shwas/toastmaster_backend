import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async registerUser(data: CreateUserDto): Promise<User> {
    const duplicateUser = await this.userRepo.findOneBy({ email: data.email });
    if (duplicateUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = this.userRepo.create({ ...data });
    return this.userRepo.save(user);
  }
}
