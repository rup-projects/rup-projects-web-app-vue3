<template>

  <form @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Name</label>
      <InputText v-model="form.name" inputId="name"/>
    </fieldset>

    <fieldset>
      <label for="surname">Surname</label>
      <InputText v-model="form.surName" inputId="surname"/>
    </fieldset>

    <fieldset>
      <label for="email">Email</label>
      <InputText v-model="form.email" inputId="email"/>
    </fieldset>

    <fieldset>
      <label for="role">Role</label>
      <Dropdown v-model="form.role" :options="roles" placeholder="Select a Role" id="role"/>
    </fieldset>

    <Button severity="secondary" text @click="cancel()">Back</Button>
    <Button text
            class="btn btn-lg pull-xs-right btn-primary"
            type="submit"
            :disabled="!(form.name && form.email && form.role)">
      Confirm
    </Button>


  </form>

</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {
  getMember,
  updateMember,
  createMember
} from "src/services/ApiServices.ts";
import {routerPush} from "src/router.ts";
import {useRoute, useRouter} from "vue-router";
import {MemberRole} from "src/models/member-role.ts";
import {Member} from "src/models/member.ts";

interface FormState {
  name: string;
  surName: string;
  email: string;
  role: MemberRole;
}

const route = useRoute()
const slug = computed<string>(() => route.params.slug as string)


const form: FormState = reactive({
  name: '',
  surName: '',
  email: '',
  role: ''
})

const roles = ref(['Architect', 'Developer'])

onMounted(() => {
      if (slug.value) {
        getMember(slug.value).then((response) => {
          const member: Member = response.data
          form.name = member.name
          form.surName = member.surName
          form.email = member.email
          form.role = member.role
        });
      }
    }
)

const onSubmit = async () => {
  let member: Member
  if (slug.value) {
    await updateMember(form).then()
  } else {
    await createMember(form).then(res => res.data.member)
  }
  await routerPush('member')
}

const cancel = async () => {
  await routerPush('member')
}


</script>

<style scoped>
.form-group label {
  margin: 0.5em
}

fieldset {
  border: 0;
}

fieldset * {
  margin-right: 1rem;
}

</style>
