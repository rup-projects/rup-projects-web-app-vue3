<template>

  {{iteration}}



</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {api} from "../services/api";
import {routerPush} from "../router";
import {Iteration} from "../models/iteration";
import {useRoute} from "vue-router";
import {getIteration} from "src/services/ApiServices.ts";

const iteration = ref<Iteration>();
const route = useRoute()
const slug = route.params.slug as string

onMounted(() => {
  getIteration(slug).then((response) => {
        iteration.value = response.data
      })
    }
);

const onRowSelect = (event) => {
  routerPush('iteration');
};

</script>
