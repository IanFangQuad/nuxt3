<template>
    <NuxtLayout>
        <template #header>
            <p class="px-6 pt-4 text-xl text-green-500">這段會放置在 header 插槽</p>
        </template>
        <template #default>
            <div>
                <h1>index</h1>
                <NuxtLink to="count" class="mx-1">count page</NuxtLink>
                <ClientOnly>
                    <!-- <GoogleLogin :callback="handleGoogleLogin" popup-type="TOKEN">
                        <button>使用 Google 進行登入</button>
                    </GoogleLogin> -->
                    <CustomGoogleLoginBtn></CustomGoogleLoginBtn>
                </ClientOnly>
                <Test></Test>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup>
</script>
