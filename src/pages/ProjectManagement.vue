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

import {ref} from "vue";
import {routerPush} from "../router";
import {usePhases} from "src/components/usePhases.js";

const { phases } = usePhases();
const selectedPhase = ref();


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
