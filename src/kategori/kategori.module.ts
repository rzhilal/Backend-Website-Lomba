import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { kategoriProviders } from './kategori.providers';

@Module({
  controllers: [KategoriController],
  providers: [KategoriService, ...kategoriProviders],
})
export class KategoriModule {}
