import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { id_users: user.id_users, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
