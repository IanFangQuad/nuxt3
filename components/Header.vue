<template>
  <div class="flex justify-between items-center mt-0">
    <h2 class="h2 flex items-center mx-2">{{ props.title }}</h2>

    <button class="bg-amber-5 h-44px shadow b-rounded items-center cursor-pointer b-none p-0" type="button"
      hover="shadow-amber bg-op-90" :class="{ 'hidden': hidden, 'flex': !hidden }" @click="handleLogout">
      <div class="flex items-center justify-center flex-grow px-2">
        <div class="i-mdi-logout-variant text-2xl text-white" />
        <p class="text-white mx-1"><b>logout</b></p>
      </div>
    </button>
  </div>

</template>

<script setup lang="ts">
import { useUserStore } from "~~/stores/user";

const props = defineProps({
  title: String,
})

const route = useRoute();
const hidden = (route.name === "login");

const userStore = useUserStore();

const handleLogout = async () => {

  const { data, error } = await useFetch("/api/auth/logout", {
    method: "POST",
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
  });

  if (error.value) {
    console.log(error.value)
  }

  userStore.update({});
  navigateTo("/login");
}
</script>
