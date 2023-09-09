<template>

  <div v-if="phases.length > 0">
    <div v-for="phase in phases">
      {{phase.type}} from: {{phase.startDate}} to: {{phase.endDate}} {{phase.duration}}
    </div>
  </div>

  <button @click="closeProject()">Close project</button>


</template>

<script setup lang="ts">

import {ref} from "vue";
import {Phase} from "../models/phase";
import {api} from "../services/api";
import {routerPush} from "../router";

const phases = ref<Phase[]>([]);

api.get(`phases/`).then((response) => {
  phases.value = response.data
})


const closeProject = async () => {
  try {
    await routerPush('home')
  } catch (e) {
    console.error(e)
  }
}

</script>
