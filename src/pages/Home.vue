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
      <Button text raised severity="danger" @click="openConfirmationModal()">Delete</Button>
      <Button text raised @click="toProjectManagementRoute()"
              style="margin-left: 0.5em">Open
      </Button>
    </template>
  </Card>
  <div v-else>
    <Button text raised label="Plan project" @click="toPlanProjectRoute()"></Button>
  </div>

  <Modal v-if="isConfirmModalOpen" @close="closeConfirmationModal()">
    <div>Are you sure?</div>

    <div class="modal-buttons">
      <Button text raised @click="closeConfirmationModal()">Cancel</Button>
      <Button text raised severity="danger" @click="deleteFirstProject()">Confirm</Button>
    </div>
  </Modal>

</template>

<script setup lang="ts">

import {routerPush} from "src/router.ts";
import {useUserStore} from "src/store/user.ts";
import {useProject} from "src/components/useProject.js";
import Modal from "src/components/Modal.vue";
import {ref} from "vue";


const {projects, firstProject, deleteProject} = useProject()
const userStore = useUserStore()
const isConfirmModalOpen = ref(false)
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

const deleteFirstProject = () => {
  deleteProject()
  //todo que sea un evento
  isConfirmModalOpen.value = false
  userStore.updateUser(null)
}

const openConfirmationModal = () => {
  isConfirmModalOpen.value = true
}

const closeConfirmationModal = () => {
  isConfirmModalOpen.value = false
}

</script>

<style scoped>

.modal-buttons {
  flex-direction: row;
}

.modal-buttons button {
  margin: 0.2em;
}


</style>

