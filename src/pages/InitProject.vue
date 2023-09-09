<template>



  <div v-if="project">
    <p>startDate: {{project.startDate}}</p>
    <p>endDate: {{project.endDate}}</p>
    <p>cost: {{ project.cost }}</p>
    <p>cost: {{ project.iterationSize }}</p>
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
import {Project} from "src/models/project.ts";

interface FormState {
  startDate: string
  endDate: string
  cost: number
}

const project = ref<Project>();
const form: FormState = reactive({
  startDate: "2023-09-10",
  endDate: "2024-01-07",
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

</script>
