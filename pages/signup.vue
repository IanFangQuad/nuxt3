<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Sign up" />
        </template>
        <template #content>
            <div class="container mx-auto">
                <div class="w-100%">
                    <form action="" class="flex flex-col items-center">
                        <div class="w-100% flex flex-col max-w-md space-y-3">
                            <label for="name" class="">name</label>
                            <input type="text" class=" h-7 px-2 tracking-wider" name="name" id="name"
                                v-model="formData.name">
                            <label for="email" class="">email</label>
                            <input type="text" class=" h-7 px-2 tracking-wider" name="email" id="email"
                                v-model="formData.email">
                            <label for="password" class="">password</label>
                            <input type="password" class=" h-7 px-2 tracking-2" name="password" id="password"
                                v-model="formData.password">
                            <label for="password_confirmation" class="">confirm password</label>
                            <input type="password" class=" h-7 px-2 tracking-2" name="password_confirmation"
                                id="password_confirmation" v-model="formData.password_confirmation">
                        </div>
                        <button
                            class="bg-rose-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                            type="button" hover="shadow-rose bg-op-90" @click="handleSignup">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-2"><b>Sign up</b></p>
                            </div>
                        </button>
                    </form>
                    <div id="msg" class="text-red-6 max-w-md flex items-center mx-auto mt-2"></div>
                </div>
            </div>
        </template>
    </NuxtLayout>
    <Modal />
</template>

<script setup>
import { useModalStore } from "@/stores/modal";
import { storeToRefs } from 'pinia'

const modalStore = useModalStore();
const { show, options } = storeToRefs(modalStore); // state 直接解構會沒關聯性
const { toggle, set } = modalStore; // action 可以直接解構

const modalOptions = reactive({
    title: 'system message',
    secondary_btn_text: 'close',
    secondary_btn_show: true,
    primary_btn_show: false,
    secondaryBtnHandler: () => { toggle() },
})

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const handleSignup = async () => {

    const { data, error } = await useFetch("http://localhost/api/user", {
        method: "POST",
        body: toRaw(formData),
        initialCache: false,
    });

    if (error.value) {
        modalOptions.title = 'warning';
        modalOptions.content = error.value.data.message;
        set(modalOptions);
        toggle();
        return;
    }

    modalOptions.content = data.value.message;
    modalOptions.secondary_btn_text = '  ok  ';
    modalOptions.secondaryBtnHandler =  () => {
        toggle();
        navigateTo("/login");
    },
    set(modalOptions);
    toggle();
}
</script>
