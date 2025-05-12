<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- Head -->
      <thead>
        <tr>
          <th><div class="skeleton h-4 w-24"></div></th>
          <th><div class="skeleton h-4 w-12"></div></th>
          <th><div class="skeleton h-4 w-16"></div></th>
          <th><div class="skeleton h-4 w-16"></div></th>
          <th><div class="skeleton h-4 w-16"></div></th>
        </tr>
      </thead>
      <tbody>
        <!-- Repeat this <tr> block for each skeleton row -->
        <tr v-for="row in rows" :key="row">
          <td>
            <div class="flex items-center gap-3">
              <div class="skeleton h-10 w-10 rounded-full"></div>
              <div>
                <div class="skeleton h-4 w-24 mb-1"></div>
                <div class="skeleton h-3 w-12"></div>
              </div>
            </div>
          </td>
          <td><div class="skeleton h-4 w-16"></div></td>
          <td><div class="skeleton h-4 w-16"></div></td>
          <td><div class="skeleton h-4 w-16"></div></td>
          <td><div class="skeleton h-4 w-16"></div></td>
        </tr>

        <!-- You can copy the above <tr> block several times to simulate multiple rows -->
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const rows = ref([1, 2, 3, 4, 5])
</script>
