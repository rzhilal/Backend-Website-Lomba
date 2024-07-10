import { Lomba } from './entities/lomba.entity';

export const lombaProviders = [
  {
    provide: 'LOMBA_REPOSITORY',
    useValue: Lomba,
  },
];
