import { Car } from './car';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly appService: AppService,
  ) {}

  fakeDatabase: Car[] = [
    {
      id: 1,
      manufacter: 'Toyota',
      model: 'Corolla',
      year: 2020,
    },
    {
      id: 2,
      manufacter: 'Mazda',
      model: '3',
      year: 2021,
    },
    {
      id: 3,
      manufacter: 'Subaru',
      model: 'Impreza',
      year: 2022,
    },
  ];

  @Get()
  async getHello() {
    const carsFromRedis = await this.cacheManager.get<Car[]>('cars');
    if (carsFromRedis && carsFromRedis.length > 0) {
      return { redis: true, data: carsFromRedis };
    }
    await this.cacheManager.set<Car[]>('cars', this.fakeDatabase);
    await new Promise((r) => setTimeout(r, 1000));
    return { redis: false, data: this.fakeDatabase };
  }
}
