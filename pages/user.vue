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
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
const { toggle, set } = modalStore; // action 可以直接解構

const modalOptions = reactive({
  title: 'system message',
  content: 'please login.',
  primary_btn_text: 'ok',
  primary_btn_show: true,
  secondary_btn_show: false,
  primaryBtnHandler: () => {
    toggle();
    navigateTo("/login");
  },
})

const userStore = useUserStore();

if (Object.keys(userStore.info).length === 0) {

  (async () => {

    const { data, error } = await useFetch("/api/auth/whoami", {
      method: "POST",
      initialCache: false,
      headers: useRequestHeaders(['cookie']),
    });

    if (error.value) {
      userStore.update({});
      set(modalOptions);
      toggle();
      return;
    }

    userStore.update(data.value);

  })();

}
</script>

