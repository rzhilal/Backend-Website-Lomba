import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { SignUpUserDto } from 'src/auth/dto/signup-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async create(
    signUpUserDto: SignUpUserDto,
    hashedPassword: string,
  ): Promise<User> {
    try {
      return await this.userRepository.create({
        ...signUpUserDto,
        id_role: 1,
        password: hashedPassword,
      });
    } catch (error) {
      // Handle the error appropriately
      throw new Error('Error during user creation');
    }
  }
}
