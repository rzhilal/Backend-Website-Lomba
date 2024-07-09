import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/role.enum';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  signIn() {
    return null;
  }

  @Post('/sign-up')
  signUp(@Body(ValidationPipe) signUpUserDto: any) {
    return signUpUserDto;
  }
}
