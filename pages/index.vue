<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Login" />
        </template>
        <template #content>
            <div class="container mx-auto">
                <div class="w-100%">
                    <div class="w-100% flex justify-center my-3">
                        <ClientOnly>
                            <CustomGoogleLoginBtn></CustomGoogleLoginBtn>
                        </ClientOnly>
                    </div>
                    <div class="w-100% text-center mb-3 mt-6">
                        <div class="inline-block border-t v-mid w-20%"></div>
                        <span class="fw-bold mx-2">&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;</span>
                        <div class="inline-block border-t v-mid w-20%"></div>
                    </div>
                    <form action="" class="flex flex-col items-center">
                        <div class="w-100% flex flex-col max-w-md space-y-3">
                            <label for="email" class="">email</label>
                            <input type="text" class=" h-7 px-2 tracking-wider" name="email" id="email">
                            <label for="password" class="">password</label>
                            <input type="password" class=" h-7 px-2 tracking-2" name="password" id="password">
                        </div>
                        <button
                            class="bg-teal-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                            type="button" hover="shadow-teal bg-op-90">
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
                        <button
                            class="bg-rose-5 w-100% h-44px shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                            type="button" hover="shadow-rose bg-op-90">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-2"><b>Sign up</b></p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup>
</script>