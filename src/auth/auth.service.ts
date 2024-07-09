import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpUserDto } from './dto/signup-user.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id_users: user.id_users,
      username: user.username,
      id_role: user.id_role,
    };
    return {
      id_users: user.id_users,
      id_role: user.id_role,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpUserDto: SignUpUserDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(signUpUserDto.password, 10);
      return this.usersService.create(signUpUserDto, hashedPassword);
    } catch (error) {
      // Handle the error appropriately
      throw new Error('Error during sign up');
    }
  }
}
