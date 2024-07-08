import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

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

  @IsString()
  @IsNotEmpty()
  @Length(3, 100, {
    message: 'Full name must be between 3 and 100 characters',
  })
  nama_lengkap: string;

  @IsEnum(['P', 'L'], {
    message: 'Valid jenis_kelamin required: P or L',
  })
  jenis_kelamin: 'P' | 'L';

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{10,15}$/, {
    message:
      'Phone number must be between 10 and 15 digits and can optionally start with +',
  })
  nomor_telepon: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 2083, {
    message: 'Address must be between 5 and 2083 characters',
  })
  alamat: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date of birth must be in the format YYYY-MM-DD',
  })
  tanggal_lahir: string;
}
