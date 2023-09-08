<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <AppLink
        class="navbar-brand"
        name="global-feed">
        AppNavigation
      </AppLink>

      <ul class="nav navbar-nav pull-xs-right">
        <li
          v-for="link in navLinks"
          :key="link.name"
          class="nav-item"
        >
          <AppLink
            class="nav-link"
            active-class="active"
            :name="link.name"
            :params="link.params"
            :aria-label="link.title"
          >
            <i
              v-if="link.icon"
              :class="link.icon"
            />
            {{ link.title }}
          </AppLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteParams } from 'vue-router'
import { storeToRefs } from 'pinia'
import {AppRouteNames} from '../router';
import {useUserStore} from '../store/user';

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

const { user } = storeToRefs(useUserStore())

const username = computed(() => user.value?.username)
const displayStatus = computed(() => username.value ? 'authorized' : 'anonym')

const allNavLinks = computed<NavLink[]>(() => [
  {
    name: 'global-feed',
    title: 'Home',
    display: 'all',
  },
  ])

const navLinks = computed(() => allNavLinks.value.filter(
  l => l.display === displayStatus.value || l.display === 'all',
))

</script>
