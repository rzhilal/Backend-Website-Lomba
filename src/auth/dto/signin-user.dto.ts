import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Username must be between 3 and 50 characters',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 255, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
