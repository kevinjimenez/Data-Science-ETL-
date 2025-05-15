import type { FiltersForm } from '@/interfaces/filters-form.interface'
import type { RouteLocationRaw } from 'vue-router'

export const useQueryParams = () => {
  const buildQueryParams = (page: number, filters: FiltersForm): RouteLocationRaw => {
    const query: Record<string, string | number> = { page }

    if (filters.name) query.name = filters.name
    if (filters.signal) query.signal = filters.signal
    if (filters.trend) query.trend = filters.trend

    return { query }
  }

  return {
    buildQueryParams,
  }
}
