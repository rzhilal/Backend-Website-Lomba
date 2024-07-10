import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { RolesGuard } from 'src/authorization/roles/roles.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/role.enum';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Roles(Role.User)
  @Post()
  create(@Body() createKategoriDto: CreateKategoriDto) {
    return this.kategoriService.create(createKategoriDto);
  }

  @Get()
  async findAll() {
    return await this.kategoriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriService.findOne(id);
  }

  @Roles(Role.User)
  @Patch()
  update(@Body() updateKategoriDto: UpdateKategoriDto) {
    return this.kategoriService.update(updateKategoriDto);
  }

  @Roles(Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategoriService.remove(id);
  }
}
