<template>

  <form @submit.prevent="onSubmit">

    <fieldset>
      <label for="name">Name</label>
      <InputText v-model="form.name" inputId="name"/>
    </fieldset>

    <fieldset>
      <label for="description">Surname</label>
      <InputText v-model="form.description" inputId="description"/>
    </fieldset>

    <fieldset>
      <label for="priority">Surname</label>
      <InputNumber v-model="form.priority" :min="0" inputId="priority"/>
    </fieldset>

    <Button severity="secondary" text @click="cancel()">Back</Button>
    <Button text
            class="btn btn-lg pull-xs-right btn-primary"
            type="submit"
            :disabled="!(form.name)">
      Confirm
    </Button>

  </form>

</template>

<script setup lang="ts">

import {computed, onMounted, reactive} from "vue";
import {getUserCase, createUseCase, updateUseCase} from "src/services/ApiServices.ts";
import {routerPush} from "src/router.ts";
import {useRoute} from "vue-router";
import {UseCase} from "src/models/use-case.ts";

interface FormState {
  name: string;
  description: string;
  priority: number;
}

const route = useRoute()
const slug = computed<string>(() => route.params.slug as string)


const form: FormState = reactive({
  name: '',
  description: '',
  priority: 0
})

onMounted(() => {
      if (slug.value) {
        getUserCase(slug.value).then((response) => {
          const usecase: UseCase = response.data
          form.name = usecase.name
          form.description = usecase.description
          form.priority = usecase.priority
        });
      }
    }
)

const onSubmit = async () => {
  let useCase: UseCase
  if (slug.value) {
    await updateUseCase(form).then()
  } else {
    await createUseCase(form).then(res => res.data.usecase)
  }
  await routerPush('usecase')
}

const cancel = async () => {
  await routerPush('usecase')
}

</script>

<style scoped>

</style>
