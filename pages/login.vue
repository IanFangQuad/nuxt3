<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Login" />
        </template>
        <template #content>
            <div class="container mx-auto">
                <div class="w-100%">
                    <div class="w-100% flex justify-center my-3">
                        <CustomGoogleLoginBtn></CustomGoogleLoginBtn>
                    </div>
                    <div class="w-100% text-center mb-3 mt-6">
                        <div class="inline-block border-t v-mid w-20%"></div>
                        <span class="fw-bold mx-2">&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;</span>
                        <div class="inline-block border-t v-mid w-20%"></div>
                    </div>
                    <form action="" class="flex flex-col items-center">
                        <div class="w-100% flex flex-col max-w-md space-y-3">
                            <label for="email" class="">email</label>
                            <input type="text" class=" h-7 px-2 tracking-wider" name="email" id="email"
                                v-model="formData.email">
                            <label for="password" class="">password</label>
                            <input type="password" class=" h-7 px-2 tracking-2" name="password" id="password"
                                v-model="formData.password">
                        </div>
                        <button
                            class="bg-teal-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                            type="button" hover="shadow-teal bg-op-90" @click="handleLogin">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-2"><b>Login</b></p>
                            </div>
                        </button>
                    </form>
                    <div class="w-100% text-center mb-3 mt-6">
                        <div class="inline-block border-t v-mid w-20%"></div>
                        <span class="fw-bold mx-2">Otherwise</span>
                        <div class="inline-block border-t v-mid w-20%"></div>
                    </div>
                    <div class="w-100% flex justify-center my-3">
                        <NuxtLink to="/signup" class="no-underline w-100% flex justify-center">
                            <button
                                class="bg-rose-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                                type="button" hover="shadow-rose bg-op-90">
                                <div class="flex items-center justify-center flex-grow">
                                    <p class="text-white mx-2"><b>Sign up</b></p>
                                </div>
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </template>
    </NuxtLayout>
    <Modal />
    <Loading :show="loading"></Loading>
</template>

<script setup lang="ts">
import { useModalStore } from "~~/stores/modal";
import { storeToRefs } from 'pinia'

const modalStore = useModalStore();
const { show, options } = storeToRefs(modalStore); // state ???????????????????????????
const { toggle, set } = modalStore; // action ??????????????????

const modalOptions: ModalOptions = reactive({
    title: 'system message',
    secondary_btn_text: 'close',
    secondary_btn_show: true,
    primary_btn_show: false,
    secondaryBtnHandler: () => { toggle() },
})

const formData = reactive({
    email: '',
    password: '',
})

const loading = ref(false);

const handleLogin = async () => {

    loading.value = true;
    
    const { data, error } = await useFetch("/api/auth/local", {
        method: "POST",
        body: toRaw(formData),
    });

    if (error.value) {
        loading.value = false;
        modalOptions.title = 'warning';
        modalOptions.content = error.value.data.message;
        set(modalOptions);
        toggle();
        return;
    }

    navigateTo("/");
}
</script>
