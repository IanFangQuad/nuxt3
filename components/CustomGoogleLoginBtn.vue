<template>
    <ClientOnly>
        <button class="bg-blue-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none p-0"
            type="button" @click="handleGoogleLogin" hover="shadow-blue bg-op-90">
            <div class="m-2px h-40px w-40px b-rounded bg-white flex items-center justify-center">
                <img class="" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            </div>
            <div class="flex items-center justify-center flex-grow">
                <p class="text-white mx-2"><b>Continue with google</b></p>
            </div>
        </button>
        <template #fallback>
            <button
                class="bg-blue-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none p-0"
                type="button" hover="shadow-blue bg-op-90">
                <div class="flex items-center justify-center flex-grow">
                    <p class="text-white mx-2"><b>Loading...</b></p>
                </div>
            </button>
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
import { googleTokenLogin } from 'vue3-google-login'
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const runtimeConfig = useRuntimeConfig()
const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

const handleGoogleLogin = async () => {
    const { access_token: accessToken } = await googleTokenLogin({
        clientId: GOOGLE_CLIENT_ID
    });

    if (!accessToken) {
        return "登入失敗";
    }

    const { data } = await useFetch("/api/auth/google", {
        method: "POST",
        body: {
            accessToken,
        },
    });

    userStore.update(data.value);
    navigateTo("/user")
}
</script>