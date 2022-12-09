<template>
  <NuxtLayout name="default">
    <template #header>
      <Header title="User" />
    </template>
    <template #content>
      <div class="container mx-auto">
        <div>
          <p>name:{{ userStore.info.name }}</p>
          <p>email:{{ userStore.info.email }}</p>
          <!-- <p>avatar:{{ userStore.info.avatar }}</p> -->
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

if (Object.keys(userStore.info).length === 0) {

  const getInfo = async () => {
    const { data, error } = await useFetch("/api/auth/whoami", {
      method: "POST",
      initialCache: false,
      headers: useRequestHeaders(['cookie']),
    });

    return { data, error };
  };

  const { data: userInfo, error } = await getInfo();

  if (error.value) {
    navigateTo("/")
  }

  userStore.update(userInfo.value);

}
</script>

