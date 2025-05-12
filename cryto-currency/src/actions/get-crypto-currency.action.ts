import { api } from '@/api/api'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'

export const getCryptoCurrencies = async () => {
  try {
    const response = await api.get<CryptoCurrency[]>(`/crypto-currency`)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error get all crypto')
  }
}
