<template>

    <DataTable :value="members"
               data-key="id" selectionMode="single" @rowSelect="onRowSelect">
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
import {useMembers} from "src/components/useMembers.js";

import {routerPush} from "src/router.ts";

const { members } = useMembers();

const createMember = async () => {
  try {
    await routerPush('create-member')
  } catch (e) {
    console.error(e)
  }
}

const onRowSelect = (event) => {
  routerPush('edit-member', {slug: event.data.id});
};



</script>

<style scoped>

</style>
