import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { SignUpUserDto } from './dto/signup-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return [];
  }

  @Post()
  signIn() {
    return null;
  }

  @Post('/sign-up')
  signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto) {
    return signUpUserDto;
  }
}
