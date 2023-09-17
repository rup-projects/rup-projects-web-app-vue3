<template>

  <div v-if="iterations.length > 0">
    <DataTable :value="iterations" selectionMode="single" data-key="id" @rowSelect="onRowSelect">
      <Column field="number" header="Number"></Column>
      <Column field="startDate" header="Start date"></Column>
      <Column field="endDate" header="End date"></Column>
    </DataTable>
  </div>


</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {routerPush} from "../router";
import {Iteration} from "../models/iteration";
import {useRoute} from "vue-router";
import {getIterations} from "src/services/ApiServices.ts";

const iterations = ref<Iteration[]>([]);
const route = useRoute()
const slug = route.params.slug as string

onMounted(() => {
      getIterations(slug).then((response) => {
        iterations.value = response.data
      })
    }
);

const onRowSelect = (event) => {
  routerPush('iteration', {slug: event.data.id});
};

</script>
