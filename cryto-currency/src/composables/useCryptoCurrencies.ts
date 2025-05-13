import { getCryptoCurrencies } from '@/actions/get-crypto-currencies.action'
import { useQuery } from '@tanstack/vue-query'
import { computed, unref, type Ref } from 'vue'

export const useCryptoCurrencies = (
  page: Ref<number>,
  name: Ref<string>,
  trend: Ref<string>,
  signal: Ref<string>,
) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['all', unref(page), unref(name), unref(trend), unref(signal)],
    queryFn: () => getCryptoCurrencies(unref(page), unref(name), unref(trend), unref(signal)),
    refetchInterval: 30000,
  })

  return {
    // pros
    isLoading: isPending,
    isError,
    messageError: error,
    cryptosCurrency: computed(() => data.value),
    refetch,
  }
}
