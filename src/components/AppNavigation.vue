<template>
  <nav>
    <div>
      <ul>
        <li v-for="link in navLinks" :key="link.name">
          <AppLink
              class="nav-link"
              active-class="active"
              :name="link.name" :params="link.params" :aria-label="link.title">
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
import {AppRouteNames} from '../router';
import {storeToRefs} from "pinia";
import {useUserStore} from "src/store/user.ts";

interface NavLink {
  name: AppRouteNames
  params?: Partial<RouteParams>
  title: string
  icon?: string
  display: 'all' | 'anonym' | 'authorized'
}

const { isAuthorized } = storeToRefs(useUserStore())

const allNavLinks = computed<NavLink[]>(() => [
  {
    name: "project-management",
    title: 'Project',
    display: 'authorized',
  },
  {
    name: "member",
    title: 'Members',
    display: 'authorized',
  },
  {
    name: "usecase",
    title: 'User cases',
    display: 'authorized',
  }
  ])

const navLinks = computed(() => {
  return allNavLinks.value.filter(
      link => link.display === (isAuthorized.value ? 'authorized' : 'anonym')
  );
})

</script>
