import { Controller, Get, Query } from '@nestjs/common';
import { CryptoCurrencyService } from './crypto-currency.service';

@Controller('crypto-currency')
export class CryptoCurrencyController {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('trend') trend: string,
    @Query('signal') signal: string,
  ) {
    if (name || trend || signal) {
      return this.cryptoCurrencyService.findAll(page, {
        name,
        trend,
        signal,
      });
    }
    return this.cryptoCurrencyService.findAll(page);
  }
}
