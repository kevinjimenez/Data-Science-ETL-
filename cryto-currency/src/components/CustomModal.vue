<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <!-- Header -->
        <!-- <slot name="header" /> -->
        <p>{{ crypto.name }}</p>
      </div>

      <div class="my-5">
        <!-- <slot name="body" /> -->
        <p>body</p>
      </div>

      <div class="border-t border-t-blue-500 pt-2">
        <button class="btn btn-primary" @click="$emit('close')">Cerrar</button>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-40 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import type { CryptoCurrency } from '@/interfaces/crypto-currency.interface'

interface Props {
  open: boolean
  crypto: CryptoCurrency
}

defineProps<Props>()

defineEmits<{
  close: [void]
}>()
</script>
