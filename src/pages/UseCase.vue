<template>

  <div v-if="usecases.length > 0">
    <DataTable :value="usecases"
               data-key="id">
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="priority" header="Priority"></Column>
    </DataTable>
  </div >

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {UseCase} from "src/models/use-case.ts";
import {getUserCases} from "src/services/ApiServices.ts";

const usecases = ref<UseCase[]>([]);

onMounted(() => {
  getUserCases().then((response) => {
        usecases.value = response.data
      })
    }
)

</script>

<style scoped>

</style>
