import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import Storage from 'src/utils/storage'
import {User} from "../models/user";

export const userStorage = new Storage<User>('user')

export const isAuthorized = (): boolean => !!userStorage.get()

export const useUserStore = defineStore('user', () => {
  const user = ref(userStorage.get())
  const isAuthorized = computed(() => !!user.value)

  function updateUser (userData?: User | null) {
    if (userData === undefined || userData === null) {
      userStorage.remove()
      user.value = null
    } else {
      userStorage.set(userData)
      user.value = userData
    }
  }

  return {
    user,
    isAuthorized,
    updateUser,
  }
})
