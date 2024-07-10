import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLombaDto } from './dto/create-lomba.dto';
import { UpdateLombaDto } from './dto/update-lomba.dto';
import { KategoriService } from 'src/kategori/kategori.service';
import { UsersService } from 'src/users/users.service';
import { Lomba } from './entities/lomba.entity';

@Injectable()
export class LombaService {
  constructor(
    @Inject('LOMBA_REPOSITORY')
    private readonly lombaRepository: typeof Lomba,
    private kategoriService: KategoriService,
    private usersService: UsersService,
  ) {}

  async create(createLombaDto: CreateLombaDto) {
    if (!(await this.usersService.findOne(createLombaDto.id_users))) {
      throw new NotFoundException('User with given id not found');
    }

    if (!(await this.kategoriService.findOne(createLombaDto.id_kategori))) {
      throw new NotFoundException('Kategori with given id not found');
    }

    return await this.lombaRepository.create(createLombaDto);
  }

  // Fungsi untuk mengambil entri Lomba dengan pagination
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Lomba[];
    total: number;
    page: number;
    pageCount: number;
  }> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.lombaRepository.findAndCountAll({
      offset,
      limit,
    });

    return {
      data: rows,
      total: count,
      page,
      pageCount: Math.ceil(count / limit),
    };
  }

  async findOne(id: string): Promise<Lomba> {
    return await this.lombaRepository.sequelize.transaction(
      async (transaction) => {
        const dataLomba = await this.lombaRepository.findByPk(id, {
          transaction,
        });

        if (!dataLomba) {
          throw new NotFoundException(`Lomba with id ${id} not found`);
        }

        return dataLomba;
      },
    );
  }

  async update(id: string, updateLombaDto: UpdateLombaDto) {
    // Cari entri Lomba berdasarkan ID
    const dataLomba = await this.lombaRepository.findByPk(id);

    // Jika tidak ditemukan, lemparkan NotFoundException
    if (!dataLomba) {
      throw new NotFoundException('Lomba with given id not found');
    }

    // Update entri Lomba dengan data dari DTO
    return await dataLomba.update(updateLombaDto);
  }

  async toggleIsActive(
    id: string,
    userId: string,
    userRole: string,
  ): Promise<Lomba> {
    // Cari entri Lomba berdasarkan ID
    const dataLomba = await this.lombaRepository.findByPk(id);

    // Jika tidak ditemukan, lemparkan NotFoundException
    if (!dataLomba) {
      throw new NotFoundException('Lomba with given id not found');
    }

    // Admin dapat melakukan operasi tanpa batasan
    if (userRole === 'admin') {
      // Toggle nilai is_active
      dataLomba.is_active = !dataLomba.is_active;

      // Simpan perubahan
      await dataLomba.save();

      // Kembalikan entri yang telah diperbarui
      return dataLomba;
    }

    // Verifikasi bahwa pengguna yang melakukan aksi adalah pemilik Lomba
    if (dataLomba.id_users !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    // Toggle nilai is_active
    dataLomba.is_active = !dataLomba.is_active;

    // Simpan perubahan
    await dataLomba.save();

    // Kembalikan entri yang telah diperbarui
    return dataLomba;
  }
}
