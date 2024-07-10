import { Module } from '@nestjs/common';
import { LombaService } from './lomba.service';
import { LombaController } from './lomba.controller';
import { lombaProviders } from './lomba.providers';
import { KategoriModule } from 'src/kategori/kategori.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [KategoriModule, UsersModule],
  controllers: [LombaController],
  providers: [LombaService, ...lombaProviders],
})
export class LombaModule {}
