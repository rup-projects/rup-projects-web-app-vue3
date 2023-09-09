<template>

  <div v-if="project">

    <p>Iteration duration: {{project.iterationSize}} days</p>

    <div v-if="project.phases.length > 0">
      <table>
        <tr>
          <th>Phase</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Duration</th>
        </tr>
        <tr v-for="phase in project.phases">
          <td>{{phase.type}}</td>
          <td>{{phase.startDate}}</td>
          <td>{{phase.endDate}}</td>
          <td>{{phase.duration}}</td>
        </tr>
      </table>
      <button @click="previousStep()">Back</button>
      <button @click="confirmProject()">Create</button>
    </div>


  </div>
  <div v-else>
    <form @submit.prevent="onSubmit">

      <fieldset class="form-group">
        <label for="startDate">Start date:</label>
        <input v-model="form.startDate"
               type="date" id="startDate" name="start"   />

        <label for="endDate">End date:</label>
        <input v-model="form.endDate"
               type="date" id="endDate" name="start" />
      </fieldset>

      <fieldset class="form-group">
        <label for="cost">Cost:</label>
        <input v-model="form.cost" type="number" id="cost" name="cost" />
      </fieldset>

      <button
          class="btn btn-lg pull-xs-right btn-primary"
          type="submit"
          :disabled="!(form.startDate && form.endDate && form.cost)">
        Next
      </button>

    </form>
  </div>





</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {api} from "../services/api";
import {Project} from "../models/project";
import {routerPush} from "../router";
import {useUserStore} from "src/store/user.ts";

interface FormState {
  startDate: string
  endDate: string
  cost: number
}

const userStore = useUserStore()

function formatDateToYYYY_MM_DD(date: Date): string {
  return date.toISOString().split('T')[0];
}


const project = ref<Project>();
let now = new Date();

const form: FormState = reactive({
  startDate: formatDateToYYYY_MM_DD(now),
  endDate: formatDateToYYYY_MM_DD(new Date(now.setMonth(now.getMonth() + 5))),
  cost: 1000
})

const onSubmit = () => {
  api.post(`projects/planned`, {
    startDate: new Date(Date.parse(form.startDate)).toISOString(),
    endDate: new Date(Date.parse(form.endDate)).toISOString(),
    cost: 100
  }).then(response => {
    project.value = response.data
  })
}

function formatFromDateToISOString(date: Date) {
  return new Date(date).toISOString();
}

const previousStep = async () => {
  form.startDate = formatFromDateToISOString(project.value?.startDate)
  form.endDate = formatFromDateToISOString(project.value?.endDate)
  form.cost = project.value?.cost
  project.value = null
}

const confirmProject = () => {
  try {
    api.post(`projects`, {
      startDate: formatFromDateToISOString(project.value?.startDate),
      endDate: formatFromDateToISOString(project.value?.endDate),
      cost: project.value?.cost,
      numberOfIterations: project.value?.numberOfIterations
    }).then( () => {
      userStore.updateUser({isAuthorized : true})
      routerPush('project-management')
    }
    )
  } catch (e) {
    console.error(e)
  }
}


</script>
