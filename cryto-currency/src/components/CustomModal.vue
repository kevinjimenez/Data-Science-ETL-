<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-slate-500">
        <p>{{ crypto.name }}</p>
      </div>

      <div class="my-5">
        <p v-if="isPending">Cargando datos...</p>
        <p v-else-if="isError">Error al cargar datos</p>
        <apexchart
          v-else-if="series.length"
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        />
        <p v-else>No hay datos</p>
      </div>

      <div class="flex">
        <button class="btn btn-primary w-full" @click="$emit('close')">Cerrar</button>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { getHistoryCryptoCurrencyByTagAction } from '@/actions/get-history-crypto-currency-by-tag.action'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'
import { useQuery } from '@tanstack/vue-query'
import { computed, watch } from 'vue'

interface Props {
  open: boolean
  crypto: CryptoCurrency
}

const props = defineProps<Props>()

defineEmits<{
  close: [void]
}>()

const { isPending, isError, data, error, refetch } = useQuery({
  queryKey: ['crypto-currency', props.crypto.tag],
  queryFn: () => getHistoryCryptoCurrencyByTagAction(props.crypto.tag),
  enabled: false,
})

console.log({ isPending, isError, data, error })

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      refetch()
    }
  },
)

// Adaptar data para el gráfico
const series = computed(() => {
  if (!data.value) return []

  const sortedData = data.value
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  return [
    {
      name: 'Precio',
      data: sortedData.map((item) => item.currentPrice),
    },
  ]
})

const chartOptions = computed(() => {
  if (!data.value) return {}

  const sortedData = data.value
    .slice()
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  return {
    chart: {
      id: 'crypto-history',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      categories: sortedData.map((item) => {
        const date = new Date(item.createdAt)
        return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
      }),
      title: { text: 'Hora' },
    },
    yaxis: {
      title: { text: 'Precio' },
    },
  }
})
</script>
