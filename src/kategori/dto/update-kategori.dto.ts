import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateKategoriDto } from './create-kategori.dto';

export class UpdateKategoriDto extends PartialType(CreateKategoriDto) {
  @IsNotEmpty()
  id_kategori: string;
}
