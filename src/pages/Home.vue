<template>

  <div v-if="projects.length > 0">
    <p>startDate: {{firstProject.startDate}}</p>
    <p>endDate: {{firstProject.endDate}}</p>
    <p>cost: {{ firstProject.cost }}</p>
    <p>cost: {{ firstProject.iterationSize }}</p>
    <button @click="toProjectManagementRoute()">Open</button>
    <button @click="deleteProject()">Delete</button>
  </div>
  <div v-else>
    <button @click="toPlanProjectRoute()">Plan project</button>
  </div>



</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {api} from "../services/api";
import {Project} from "../models/project.ts";
import {routerPush} from "src/router.ts";

const projects = ref<Project[]>([]);

api.get(`projects/`).then((response) => {
  projects.value = response.data
})

const firstProject = computed(() => {
  return projects.value[0]
})

const toProjectManagementRoute = async () => {
  try {
    await routerPush('project-management')
  } catch (e) {
    console.error(e)
  }
}

const toPlanProjectRoute = async () => {
  try {
    await routerPush('init-project')
  } catch (e) {
    console.error(e)
  }

}

const deleteProject = () => {

}


</script>
