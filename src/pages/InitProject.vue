<template>

  <div v-if="project">

    <div v-if="project.phases.length > 0">
      <DataTable :value="project.phases">
        <template #header class="preview-phases-header">
          <Tag severity="info" icon="pi pi-calendar">{{ project.startDate }} to {{ project.endDate }}</Tag>

          <Tag severity="info" icon="pi pi-clock">Iteration duration:
            {{ project.iterationSize }} days
          </Tag>

          <Tag severity="info" icon="pi pi-dollar">{{ project.cost }}</Tag>

          <InputNumber v-model="form.numberOfIterations"
                       prefix="Project with " suffix=" iterations" :step="10" showButtons></InputNumber>

          <Button @click="refreshProject()" text raised>refresh</Button>
        </template>

        <Column field="type" header="Type"></Column>
        <Column field="startDate" header="Start date"></Column>
        <Column field="endDate" header="End date"></Column>
        <template #footer>
          <Button severity="secondary" text @click="previousStep()">Back</Button>
          <Button text raised @click="confirmProject()">Create</Button>
        </template>
      </DataTable>

    </div>


  </div>
  <div v-else>
    <form @submit.prevent="onSubmit">

      <fieldset class="form-group">

        <label for="startDate">Start date:</label>
        <Calendar v-model="form.startDate" dateFormat="yy-mm-dd" :manualInput="false" showIcon/>

        <label for="endDate">End date:</label>
        <Calendar v-model="form.endDate" dateFormat="yy-mm-dd" :manualInput="false" showIcon/>

      </fieldset>

      <fieldset class="form-group">
        <label for="cost">Cost:</label>
        <InputNumber v-model="form.cost" inputId="cost" :min="0"/>
      </fieldset>

      <Button severity="secondary" text @click="backToHome()">Back</Button>
      <Button text
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
              :disabled="!(form.startDate && form.endDate && form.cost)">
        Next
      </Button>

    </form>
  </div>


</template>

<script setup lang="ts">

import {reactive, ref} from "vue";
import {Project} from "../models/project";
import {routerPush} from "../router";
import {useUserStore} from "src/store/user.ts";
import {createProject, preCreateProject} from "src/services/ApiServices.ts";
import {DateTime} from "luxon";

interface FormState {
  startDate: string
  endDate: string
  cost: number
  numberOfIterations?: number
}

const userStore = useUserStore()


const project = ref<Project>();
const form: FormState = reactive({
  startDate: DateTime.now().toFormat('yyyy-MM-dd'),
  endDate: DateTime.now().plus({month: 5}).toFormat('yyyy-MM-dd'),
  cost: 1000
})

function formatFromDateToISOString(date: Date) {
  return new Date(date).toISOString();
}

const previousStep = async () => {
  form.startDate = DateTime.fromJSDate(project.value?.startDate).toFormat('yyyy-MM-dd')
  form.endDate = DateTime.fromJSDate(project.value?.endDate).toFormat('yyyy-MM-dd')
  form.cost = project.value?.cost
  project.value = null
}

const backToHome = () => {
  routerPush('home')
}

const onSubmit = () => {
  preCreateProject({
    startDate: DateTime.fromISO(form.startDate).toBSON(),
    endDate: DateTime.fromISO(form.endDate).toBSON(),
    cost: 100
  }).then(response => {
    project.value = response.data
    form.numberOfIterations = response.data.numberOfIterations
  })
}

const refreshProject = () => {
  try {
    preCreateProject({
      startDate: DateTime.fromISO(form.startDate).toBSON(),
      endDate: DateTime.fromISO(form.endDate).toBSON(),
      cost: 100,
      numberOfIterations: form.numberOfIterations
    }).then(response => {
      project.value = response.data
    })
  } catch (e) {
    console.error(e)
  }
}


const confirmProject = () => {
  try {
    createProject({
      startDate: formatFromDateToISOString(project.value?.startDate),
      endDate: formatFromDateToISOString(project.value?.endDate),
      cost: project.value?.cost!,
      numberOfIterations: project.value?.numberOfIterations!
    }).then(() => {
          userStore.updateUser({isAuthorized: true})
          routerPush('project-management')
        }
    )
  } catch (e) {
    console.error(e)
  }
}


</script>


<style scoped>

.form-group label {
  margin: 0.5em
}

fieldset {
  border: 0;
}

.p-datatable-header > * {
  margin-left: 0.5em
}

</style>
