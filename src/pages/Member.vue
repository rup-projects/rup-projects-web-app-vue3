<template>

    <DataTable :value="members"
               data-key="id">
      <template #empty>
        No members found
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="surName" header="Surname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="role" header="Role"></Column>
      <template #footer><Button severity="secondary" text raised @click="createMember()">Create member</Button></template>
    </DataTable>


</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Member} from "src/models/member.ts";
import {getMembers} from "src/services/ApiServices.ts";
import {routerPush} from "src/router.ts";

const members = ref<Member[]>([]);

onMounted(() => {
  getMembers().then((response) => {
        members.value = response.data
      })

    }
)

const createMember = async () => {
  try {
    await routerPush('home')
  } catch (e) {
    console.error(e)
  }
}


</script>

<style scoped>

</style>
