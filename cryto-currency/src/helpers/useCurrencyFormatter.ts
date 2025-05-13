export const useCurrencyFormatter = (locale = 'es-ES', currency = 'USD') => {
  const formatCurrency = (value: number) => {
    if (typeof value !== 'number') return value
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(value)
  }

  return { formatCurrency }
}
