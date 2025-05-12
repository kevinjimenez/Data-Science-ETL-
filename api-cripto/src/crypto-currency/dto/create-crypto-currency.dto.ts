import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCryptoCurrencyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  currentPrice: number;

  @IsNotEmpty()
  @IsNumber()
  high24h: number;

  @IsNotEmpty()
  @IsNumber()
  low24h: number;

  @IsNotEmpty()
  @IsNumber()
  high1h: number;

  @IsNotEmpty()
  @IsNumber()
  low1h: number;

  @IsNotEmpty()
  @IsString()
  signal: string;
}
