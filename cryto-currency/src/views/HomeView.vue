<template>
  <section class="flex flex-col h-screen">
    <!-- <section class="w-full flex justify-center bg-red-900">
      <h1 class="text-2xl font-normal text-center my-4 text-white">
        Diseño de proceso ETL en Data Science - Componente practico uno
      </h1>
    </section> -->

    <header class="bg-white shadow-md border-b border-gray-200 py-4 px-6">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-4 mb-4 md:mb-0">
          <img src="@/assets/uide.jpg" alt="UIDE Logo" class="h-12" />
          <div class="text-sm text-gray-600">Powered by Arizona State University®</div>
        </div>

        <!-- Grupo -->
        <div class="text-right text-sm text-gray-800">
          <p class="font-semibold">Grupo número 4</p>
          <p>Fernando Siguenza, Kevin Jimenez</p>
          <p>Maria Jose Chavez, Yessenia Carrillo</p>
        </div>
      </div>

      <!-- Título del componente -->
      <h1 class="text-center text-lg md:text-xl font-bold text-gray-800 mt-6">
        Diseño de proceso ETL en Data Science - Componente práctico tres
      </h1>
    </header>

    <h2
      class="text-2xl md:text-3xl font-extrabold text-center text-slate-500 mt-8 mb-4 tracking-tight"
    >
      💰 Precio de las Criptomonedas Hoy
    </h2>

    <section class="flex gap-x-4 mx-4 my-3">
      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Nombre</legend>
        <input type="text" class="input" placeholder="Ej: Bitcoin" v-model="name" />
        <p class="label text-slate-500">Buscar por nombre</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Señal</legend>
        <select class="select" v-model="signal">
          <option value="" selected>--Seleccione una opción--</option>
          <option value="B">Buy (B)</option>
          <option value="S">Sell (S)</option>
        </select>
        <p class="label text-slate-500">Filtrar por señales</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend text-slate-500">Trend</legend>
        <select class="select" v-model="trend">
          <option value="" selected>--Seleccione una opción--</option>
          <option value="same">Same</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
        <p class="label text-slate-500">Filtrar por trend</p>
      </fieldset>
    </section>

    <div v-if="isLoading">
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
import TableSkeleton from '@/components/TableSkeleton.vue'
import { useCryptoCurrencies } from '@/composables/useCryptoCurrencies'
import { useCurrencyFormatter } from '@/helpers/useCurrencyFormatter'
import { ref, watch } from 'vue'

const page = ref(1)
const name = ref('')
const signal = ref('')
const trend = ref('')

const { cryptosCurrency, isLoading, refetch } = useCryptoCurrencies(page, name, trend, signal)
const { formatCurrency } = useCurrencyFormatter()

const backPage = () => {
  if (page.value === 1) return
  page.value--
}

const nextPage = () => {
  page.value++
}

watch(page, () => {
  refetch()
})

watch(name, () => {
  refetch()
})

watch(trend, () => {
  refetch()
})

watch(signal, () => {
  refetch()
})
</script>
