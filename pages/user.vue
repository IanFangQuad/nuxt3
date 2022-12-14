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
  <Modal />
</template>

<script setup>
const { whoami, userStore, modalStore } = useWhoami();
whoami();
onMounted(() => {
  console.log('mounted')
})
</script>

