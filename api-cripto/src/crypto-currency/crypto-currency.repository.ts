import { Injectable } from '@nestjs/common';
import { CryptoCurrency, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CryptoCurrencyRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public createCryptoCurrency(
    payload: Prisma.CryptoCurrencyCreateInput,
  ): Promise<CryptoCurrency> {
    return this.databaseService.cryptoCurrency.create({
      data: payload,
    });
  }

  public createMany(payload: Prisma.CryptoCurrencyCreateInput[]) {
    return this.databaseService.cryptoCurrency.createMany({ data: payload });
  }

  public updateById(
    id: string,
    payload: Prisma.CryptoCurrencyCreateInput,
  ): Promise<CryptoCurrency> {
    return this.databaseService.cryptoCurrency.update({
      where: { id },
      data: payload,
    });
  }

  public updateManyById(data: Prisma.CryptoCurrencyCreateInput[]) {
    const operations = data.map((item) => {
      if (!item.id) return this.createCryptoCurrency(item);
      return this.updateById(item.id, item);
    });
    console.log(operations);

    return 'all updated';
  }

  public getCryptoCurrencies(): Promise<CryptoCurrency[]> {
    return this.databaseService.cryptoCurrency.findMany({});
  }

  public async deleteAll() {
    await this.databaseService.cryptoCurrency.deleteMany({});
    return 'delete all';
  }
}
