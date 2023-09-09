<template>
  <nav class="navbar navbar-light">
    <div class="container">

    HEADER


    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteParams } from 'vue-router'
import {AppRouteNames} from '../router';

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}



const allNavLinks = computed<NavLink[]>(() => [
  {
    name: 'global-feed',
    title: 'Home',
    display: 'all',
  },
  ])

const navLinks = computed(() => allNavLinks.value.filter(
  l => l.display === 'all',
))

</script>
