import { Kategori } from './entities/kategori.entity';

export const kategoriProviders = [
  {
    provide: 'KATEGORI_REPOSITORY',
    useValue: Kategori,
  },
];
