<template>

  <div v-if="members.length > 0">
    <DataTable :value="members"
               data-key="id">
      <Column field="name" header="Name"></Column>
      <Column field="surName" header="Surname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="role" header="Role"></Column>
    </DataTable>
  </div >


</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Member} from "src/models/member.ts";
import {getMembers} from "src/services/ApiServices.ts";

const members = ref<Member[]>([]);

onMounted(() => {
  getMembers().then((response) => {
        members.value = response.data
      })

    }
)


</script>

<style scoped>

</style>
