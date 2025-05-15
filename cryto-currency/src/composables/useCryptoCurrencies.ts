import { getCryptoCurrenciesAction } from '@/actions/get-crypto-currencies.action'
import type { FiltersForm } from '@/interfaces/filters-form.interface'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, watchEffect, type Ref } from 'vue'

export const useCryptoCurrencies = (page: Ref<number>, filters: Ref<FiltersForm>) => {
  console.log({ filters: filters.value })

  const queryClient = useQueryClient()

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['crypto-currency', { page, filters }],
    queryFn: () => getCryptoCurrenciesAction(page.value, filters.value),
  })

  watchEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['crypto-currency', { page: page.value + 1 }],
      queryFn: () => getCryptoCurrenciesAction(page.value + 1),
    })
  })

  return {
    // pros
    cryptosCurrency: computed(() => data.value),
    isLoading: computed(() => isPending.value),
    isError,
    messageError: error,
    refetch,
  }
}
