import { Injectable } from '@nestjs/common';
import { CreateCryptoCurrencyDto } from 'src/crypto-currency/dto/create-crypto-currency.dto';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { CryptoCurrencyService } from '../crypto-currency/crypto-currency.service';
import { type CryptoResponse } from './interfaces/crypto.response';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly cryptoCurrencyService: CryptoCurrencyService,
  ) {}
  public async executeSeed() {
    await this.cryptoCurrencyService.deleteAll();

    const data = await this.http.get<CryptoResponse[]>(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1',
    );
    const cryptoToCreate = data.map((crypto) => {
      const newCrypto = new CreateCryptoCurrencyDto();
      newCrypto.name = crypto.name;
      newCrypto.image = crypto.image;
      newCrypto.symbol = crypto.symbol;
      newCrypto.currentPrice = crypto.current_price;
      newCrypto.high24h = crypto.high_24h;
      newCrypto.low24h = crypto.low_24h;
      newCrypto.high1h = crypto.high_24h;
      newCrypto.low1h = crypto.low_24h;
      newCrypto.signal = 'B';
      return newCrypto;
    });
    await this.cryptoCurrencyService.createMany(cryptoToCreate);

    return 'Seed executed';
  }

  // @Cron('*/2 * * * * *') // 2 seconds
  @Cron('45 * * * * *')
  async handleCron() {
    console.log('Running seed every 5 seconds');
    await this.executeSeed();
  }
}
