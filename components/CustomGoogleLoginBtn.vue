<template>
    <button type="button" @click="handleGoogleLogin">
        使用 Google 繼續
    </button>
</template>

<script setup>
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
        initialCache: false,
    });

    userStore.update(data.value);
    navigateTo("/user")
}
</script>