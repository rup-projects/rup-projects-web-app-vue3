<template>

  <Card v-if="projects.length > 0"
        style="width: 25em">
    <template #title>
      Project {{ firstProject.id }}
    </template>
    <template #subtitle>
      <Tag severity="info" icon="pi pi-calendar"
           style="margin-left: 0.2em">{{ firstProject.startDate }} to {{ firstProject.endDate }}
      </Tag>
      <Tag severity="info" icon="pi pi-dollar"
           style="margin-left: 0.2em">{{ firstProject.cost }}
      </Tag>
      <Tag severity="info" icon="pi pi-clock"
           style="margin-left: 0.2em">{{ firstProject.iterationSize }} days
      </Tag>
    </template>

    <template #content>
      <p>

      </p>
      <p>

      </p>
    </template>

    <template #footer>
      <Button text raised severity="danger" @click="deleteProject()">Delete</Button>
      <Button text raised @click="toProjectManagementRoute()"
              style="margin-left: 0.5em">Open
      </Button>
    </template>
  </Card>
  <div v-else>
    <Button text raised label="Plan project" @click="toPlanProjectRoute()"></Button>
  </div>


</template>

<script setup lang="ts">

import {computed, ref} from "vue";
import {Project} from "../models/project.ts";
import {routerPush} from "src/router.ts";
import {useUserStore} from "src/store/user.ts";
import {getProject} from "src/services/ApiServices.ts";
import {deletePr} from "src/services/ApiServices";


const projects = ref<Project[]>([]);
const userStore = useUserStore()

getProject().then((response) => {
  projects.value = response.data
})

const firstProject = computed(() => {
  return projects.value[0]
})

const toProjectManagementRoute = async () => {
  try {
    userStore.updateUser({isAuthorized: true})
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
  deletePr().then()
  projects.value = [];
  //todo que sea un evento
  userStore.updateUser(null)
}


</script>
