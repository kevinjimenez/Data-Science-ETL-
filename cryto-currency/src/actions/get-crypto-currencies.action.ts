import { api } from '@/api/api'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'

export const getCryptoCurrencies = async (
  page: number,
  name?: string,
  trend?: string,
  signal?: string,
) => {
  try {
    const response = await api.get<CryptoCurrency[]>(`/crypto-currency`, {
      params: {
        page,
        name,
        trend,
        signal,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error get all crypto')
  }
}
