<template>
  <section class="flex flex-col h-screen">
    <h1 class="text-2xl font-normal text-center mt-4">Precio de las Criptomonedas hoy</h1>
    <section class="flex gap-x-4 mx-4">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Nombre</legend>
        <input type="text" class="input" placeholder="Ej: Bitcoin" />
        <p class="label">Buscar por nombre</p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Señal</legend>
        <select class="select">
          <option value="" selected>--Seleccione una opción--</option>
          <option value="B">Buy (B)</option>
          <option value="S">Sell (S)</option>
        </select>
        <p class="label">Filtrar por señales</p>
      </fieldset>
    </section>

    <!-- <div class="grow" /> -->

    <div v-if="isLoading">
      <TableSkeleton />
    </div>

    <div
      v-else
      class="overflow-x-auto h-[40rem] h-min-[20rem] h-max-[20rem] rounded-box border border-base-content/5 bg-base-100 m-4"
    >
      <table class="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Low 24h</th>
            <th>High 24h</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptosCurrency" :key="crypto.id">
            <td>
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
            <td>{{ crypto.currentPrice }}</td>
            <td>{{ crypto.low24h }}</td>
            <td>{{ crypto.high24h }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
<script setup lang="ts">
import TableSkeleton from '@/components/TableSkeleton.vue'
import { useCryptoCurrencies } from '@/composables/useCryptoCurrencies'

const { cryptosCurrency, isError, isLoading, messageError } = useCryptoCurrencies()

console.log({
  cryptosCurrency,
  isError,
  isLoading,
  messageError,
})
</script>
