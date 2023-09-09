<template>

  <table v-if="phases.length > 0">
    <tr>
      <th>Phase</th>
      <th>Start date</th>
      <th>End date</th>
      <th>Duration</th>
    </tr>
    <tr v-for="phase in phases">
      <td>{{phase.type}}</td>
      <td>{{phase.startDate}}</td>
      <td>{{phase.endDate}}</td>
      <td>{{phase.duration}}</td>
    </tr>
  </table>

  <button @click="closeProject()">Close project</button>


</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {Phase} from "../models/phase";
import {api} from "../services/api";
import {routerPush} from "../router";

const phases = ref<Phase[]>([]);

onMounted(() => {
  api.get(`phases/`).then((response) => {
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

</script>
