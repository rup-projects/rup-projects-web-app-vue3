import { computed, readonly, Ref, ref } from "vue";

interface User {
  isAuthorized: boolean;
}

const user: Ref<User | null> = ref(null);

export function useUser() {


  return {
    user: readonly(user),
    isLogged: computed(() => !!user.value),
    isAuthorized: computed(() => !!user.value?.isAuthorized),
  };
}
