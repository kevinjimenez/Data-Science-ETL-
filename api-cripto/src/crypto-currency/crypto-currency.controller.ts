import { Controller, Get } from '@nestjs/common';
import { CryptoCurrencyService } from './crypto-currency.service';

@Controller('crypto-currency')
export class CryptoCurrencyController {
  constructor(private readonly cryptoCurrencyService: CryptoCurrencyService) {}

  @Get()
  findAll() {
    return this.cryptoCurrencyService.findAll();
  }
}
