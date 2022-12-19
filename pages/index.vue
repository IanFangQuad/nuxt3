<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Index">
                <LogoutBtn />
            </Header>
        </template>
        <template #content>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})
</script>
