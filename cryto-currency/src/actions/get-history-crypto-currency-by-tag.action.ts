import { api } from '@/api/api'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'

export const getHistoryCryptoCurrencyByTagAction = async (tag: string) => {
  try {
    const response = await api.get<CryptoCurrency[]>(`/crypto-currency/${tag}`, {})
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error get all crypto')
  }
}
