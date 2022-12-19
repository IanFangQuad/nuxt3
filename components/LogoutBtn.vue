<template>
  <button class="bg-amber-5 h-44px shadow b-rounded items-center cursor-pointer b-none p-0 flex" type="button"
    hover="shadow-amber bg-op-90" @click="handleLogout">
    <div class="flex items-center justify-center flex-grow px-2">
      <div class="i-mdi-logout-variant text-2xl text-white" />
      <p class="text-white mx-1"><b>logout</b></p>
    </div>
  </button>
  <Loading :show="loading"></Loading>
</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/user";

const route = useRoute();

const userStore = useUserStore();

const loading = ref(false);

const handleLogout = async () => {

  loading.value = true;

  const { data, error } = await useFetch("/api/auth/logout", {
    method: "POST",
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
  });

  loading.value = false;

  if (error.value) {
    console.log(error.value)
  }

  userStore.update({});
  navigateTo("/login");
}
</script>
