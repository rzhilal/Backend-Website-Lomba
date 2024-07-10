import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { Kategori } from './entities/kategori.entity';

@Injectable()
export class KategoriService {
  constructor(
    @Inject('KATEGORI_REPOSITORY')
    private readonly kategoriRepository: typeof Kategori,
  ) {}
  async create(createKategoriDto: CreateKategoriDto) {
    if (
      await this.kategoriRepository.findOne({
        where: { nama_kategori: createKategoriDto.nama_kategori },
      })
    ) {
      throw new BadRequestException('Kategori already exists');
    }
    return await this.kategoriRepository.create(createKategoriDto);
  }

  async findAll() {
    return await this.kategoriRepository.findAll();
  }

  async findOne(id: string) {
    return await this.kategoriRepository.findByPk(id);
  }

  async update(updateKategoriDto: UpdateKategoriDto) {
    const kategori = await this.kategoriRepository.findByPk(
      updateKategoriDto.id_kategori,
    );
    if (!kategori) {
      throw new BadRequestException('Kategori not found');
    }

    if (
      await this.kategoriRepository.findOne({
        where: { nama_kategori: updateKategoriDto.nama_kategori },
      })
    ) {
      throw new BadRequestException('Kategori already exists');
    }
    kategori.nama_kategori = updateKategoriDto.nama_kategori;
    return await kategori.save();
  }

  remove(id: string) {
    return `This action removes a #${id} kategori`;
  }
}
