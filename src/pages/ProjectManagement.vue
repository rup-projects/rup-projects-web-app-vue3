<template>

  <div v-if="phases.length > 0">
    <DataTable :value="phases"
               v-model:selection="selectedPhase" selectionMode="single" data-key="id" @rowSelect="onRowSelect">
      <Column field="type" header="Type"></Column>
      <Column field="startDate" header="Start date"></Column>
      <Column field="endDate" header="End date"></Column>
      <template #footer><Button severity="secondary" text raised @click="closeProject()">Close project</Button></template>
    </DataTable>
  </div >





</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Phase} from "../models/phase";
import {routerPush} from "../router";
import {getPhases} from "src/services/ApiServices.ts";

const phases = ref<Phase[]>([]);
const selectedPhase = ref();

onMounted(() => {
  getPhases().then((response) => {
    phases.value = response.data
  })

    }
);

const closeProject = async () => {
  try {
    await routerPush('home')
  } catch (e) {
    console.error(e)
  }
}

const onRowSelect = (event) => {
  routerPush('phase', { slug: event.data.id })
};

</script>
