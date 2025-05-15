import { api } from '@/api/api'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'
import type { FiltersForm } from '@/interfaces/filters-form.interface'

export const getCryptoCurrenciesAction = async (page: number, filters?: FiltersForm) => {
  try {
    const response = await api.get<CryptoCurrency[]>(`/crypto-currency`, {
      params: {
        page,
        name: filters?.name,
        trend: filters?.trend,
        signal: filters?.signal,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Error get all crypto')
  }
}
