<template>

  <form @submit.prevent="onSubmit">



  </form>

</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {getUserCase, createUseCase, updateUseCase} from "src/services/ApiServices.ts";
import {routerPush} from "src/router.ts";
import {useRoute, useRouter} from "vue-router";
import UseCase from "src/pages/UseCase.vue";

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
    await createUseCase(form).then(res => res.data.article)
  }
  await routerPush('usecase')
}


</script>

<style scoped>

</style>
