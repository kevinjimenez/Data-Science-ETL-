import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';

@Injectable()
export class CryptoCurrencyService {
  constructor(
    private readonly cryptoCurrencyRepository: CryptoCurrencyRepository,
  ) {}

  public async createMany(payload: CreateCryptoCurrencyDto[]) {
    try {
      const results = await this.cryptoCurrencyRepository.createMany(payload);
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  findAll() {
    return this.cryptoCurrencyRepository.getCryptoCurrencies();
  }

  public async deleteAll() {
    try {
      const results = await this.cryptoCurrencyRepository.deleteAll();
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
