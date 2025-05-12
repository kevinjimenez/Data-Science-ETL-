import { Injectable } from '@nestjs/common';
import { CreateCryptoCurrencyDto } from 'src/crypto-currency/dto/create-crypto-currency.dto';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { CryptoCurrencyService } from '../crypto-currency/crypto-currency.service';
import { type CryptoResponse } from './interfaces/crypto.response';

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
    const newData = data.map((crypto) => {
      const a = new CreateCryptoCurrencyDto();
      a.name = crypto.name;
      a.image = crypto.image;
      a.currentPrice = crypto.current_price;
      a.high24h = crypto.high_24h;
      a.low24h = crypto.low_24h;
      a.high1h = crypto.high_24h;
      a.low1h = crypto.low_24h;
      a.signal = 'B';
      return a;
    });
    await this.cryptoCurrencyService.createMany(newData);
    // console.log(JSON.stringify(data, null, 2));

    return 'Seed executed';
  }

  // @Cron('*/5 * * * * *')
  // handleCron() {
  //   this.logger.debug('Cada 5 segundos');
  //   // this.executeSeed();
  // }
}
