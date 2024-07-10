import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateKategoriDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50, {
    message: 'Kategori name must be between 3 and 50 characters',
  })
  nama_kategori: string;
}
