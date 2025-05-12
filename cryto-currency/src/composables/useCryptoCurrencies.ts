import { getCryptoCurrencies } from '@/actions/get-crypto-currency.action'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

export const useCryptoCurrencies = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['all'],
    queryFn: getCryptoCurrencies,
    refetchInterval: 5000,
  })

  return {
    // pros
    isLoading: isPending,
    isError,
    messageError: error,
    cryptosCurrency: computed(() => data.value),
  }
}
