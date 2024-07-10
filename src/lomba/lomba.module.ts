import { Module } from '@nestjs/common';
import { LombaService } from './lomba.service';
import { LombaController } from './lomba.controller';
import { lombaProviders } from './lomba.providers';
import { KategoriService } from 'src/kategori/kategori.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [KategoriService, UsersService],
  controllers: [LombaController],
  providers: [LombaService, ...lombaProviders],
})
export class LombaModule {}
