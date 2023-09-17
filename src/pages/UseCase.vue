<template>

  <div >
    <DataTable :value="usecases" data-key="id" selectionMode="single" @rowSelect="onRowSelect">
      <template #empty>
        No use cases found
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column field="priority" header="Priority"></Column>
      <template #footer><Button severity="secondary" text raised @click="createUseCase()">Create Usecase</Button></template>
    </DataTable>
  </div >

</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {UseCase} from "src/models/use-case.ts";
import {getUserCases} from "src/services/ApiServices.ts";
import {routerPush} from "src/router.ts";

const usecases = ref<UseCase[]>([]);

onMounted(() => {
  getUserCases().then((response) => {
        usecases.value = response.data
      })
    }
)

const createUseCase = async () => {
  try {
    await routerPush('create-usecase')
  } catch (e) {
    console.error(e)
  }
}

const onRowSelect = (event) => {
  routerPush('edit-usecase', {slug: event.data.id});
};



</script>

<style scoped>

</style>
