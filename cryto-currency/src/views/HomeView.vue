<template>
  <section class="flex flex-col h-screen">
    <CustomHeader />

    <h2
      class="text-2xl md:text-3xl font-extrabold text-center text-slate-500 mt-8 mb-4 tracking-tight"
    >
      💰 Precio de las Criptomonedas Hoy
    </h2>

    <section class="flex gap-x-4 mx-4 my-3">
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Nombre</legend>
        <input
          type="text"
          class="input"
          placeholder="Ej: Bitcoin"
          v-model="name"
          v-bind="nameAttrs"
        />
        <p class="label text-slate-500">Buscar por nombre</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Señal</legend>
        <select class="select" v-model="signal" v-bind="signalAttrs">
          <option value="" selected>Todos</option>
          <option value="B">Buy (B)</option>
          <option value="S">Sell (S)</option>
        </select>
        <p class="label text-slate-500">Filtrar por señales</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Trend</legend>
        <select class="select" v-model="trend" v-bind="trendAttrs">
          <option value="" selected>Todos</option>
          <option value="same">Same</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
        <p class="label text-slate-500">Filtrar por trend</p>
      </fieldset>
    </section>

    <div v-if="!cryptosCurrency">
      <TableSkeleton />
    </div>

    <div v-else class="m-4">
      <div
        class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
      >
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Nombre</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Precio Actual</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Low 1h</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">High 1h</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">AVG</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Trend</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Signal</p>
              </th>
              <th class="p-4 border-b border-slate-200 bg-slate-50">
                <p class="text-sm font-normal leading-none text-slate-500">Acciones</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!cryptosCurrency || cryptosCurrency.length === 0" class="col-span-6">
              <td colspan="7">
                <p class="text-center py-4">No se encontraron resultados.</p>
              </td>
            </tr>
            <tr
              v-else
              v-for="crypto in cryptosCurrency"
              :key="crypto.id"
              class="hover:bg-slate-50 border-b border-slate-200"
            >
              <td class="p-4 py-5">
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle h-12 w-12">
                      <img :src="crypto.image" alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ crypto.name }}</div>
                    <div class="text-sm opacity-50">{{ crypto.symbol.toUpperCase() }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 py-5">
                <p
                  :class="{
                    'text-slate-500': crypto.trend === 'same',
                    'text-green-500': crypto.trend === 'up',
                    'text-red-500': crypto.trend === 'down',
                  }"
                  class="text-sm"
                >
                  {{ formatCurrency(crypto.currentPrice) }}
                </p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">
                  {{ formatCurrency(crypto.high1h) }}
                </p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">
                  {{ formatCurrency(crypto.low1h) }}
                </p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">
                  {{ formatCurrency(crypto.avg) }}
                </p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">
                  {{ crypto.trend }}
                </p>
              </td>
              <td class="p-4 py-5">
                <p class="text-sm text-slate-500">
                  {{ crypto.signal }}
                </p>
              </td>

              <td class="flex items-center justify-center py-5">
                <button class="btn" @click="modalOpen(crypto)">Grafico</button>
                <CustomModal :open="isOpen === crypto.id" @close="isOpen = ''" :crypto="crypto" />
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-between items-center px-4 py-3">
          <div class="grow" />
          <div class="flex space-x-1">
            <button
              class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
              @click="backPage"
            >
              Prev
            </button>

            <button
              class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
              @click="nextPage"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import CustomHeader from '@/components/CustomHeader.vue'
import CustomModal from '@/components/CustomModal.vue'
import TableSkeleton from '@/components/TableSkeleton.vue'
import { useCryptoCurrencies } from '@/composables/useCryptoCurrencies'
import { useQueryParams } from '@/helpers/useBuildQueryParams'
import { useCurrencyFormatter } from '@/helpers/useCurrencyFormatter'
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'
import type { FiltersForm } from '@/interfaces/filters-form.interface'
import { debounce } from 'lodash-es'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// composables self vue 3 and composables without args
const route = useRoute()
const router = useRouter()
const { formatCurrency } = useCurrencyFormatter()
const { buildQueryParams } = useQueryParams()

// variables not depend on composables
const isOpen = ref('')
const page = ref(Number(route.query.page) || 1)
const initialValuesFilters = ref({
  name: route.query.name?.toString() ?? '',
  signal: route.query.signal?.toString() || '',
  trend: route.query.trend?.toString() || '',
})

// composables with args and variables depend on composables
const { values, defineField } = useForm<FiltersForm>({
  initialValues: initialValuesFilters.value,
})

const nameDebounced = ref(values.name)
const filters = computed(() => ({
  ...values,
  name: nameDebounced.value,
}))

const { cryptosCurrency } = useCryptoCurrencies(page, filters)
const [name, nameAttrs] = defineField('name')
const [signal, signalAttrs] = defineField('signal')
const [trend, trendAttrs] = defineField('trend')

// methods
const modalOpen = (crypto: CryptoCurrency) => {
  isOpen.value = crypto.id
}

const backPage = () => {
  if (page.value === 1) return
  page.value--
  const queryParams = buildQueryParams(page.value, values)
  router.push(queryParams)
}

const nextPage = () => {
  page.value++
  const queryParams = buildQueryParams(page.value, values)

  router.push(queryParams)
}

// watchers
watch(
  () => route.query.page,
  (newPage) => {
    page.value = Number(newPage || 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
)

watch(values, (newValues) => {
  const queryParams = buildQueryParams(page.value, newValues)
  router.push(queryParams)
})

watch(
  () => values.name,
  debounce((val) => {
    nameDebounced.value = val
  }, 400),
  { flush: 'post' },
)
</script>
