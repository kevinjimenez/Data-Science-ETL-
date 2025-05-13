<template>
  <dialog ref="dialogRef" class="modal" v-if="visible" @close="emit('update:visible', false)">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">This is a modal controlled by v-model.</p>
    </div>
    <form method="dialog" class="modal-backdrop" @submit="emit('update:visible', false)">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
}>()
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      dialogRef.value?.showModal()
    } else {
      dialogRef.value?.close()
    }
  },
)
</script>
