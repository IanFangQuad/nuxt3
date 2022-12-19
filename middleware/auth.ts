import { useUserStore } from "~~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const userStore = useUserStore();

    if (Object.keys(userStore.info).length === 0) {

        const whoami = async () => {

            const { data, error } = await useFetch("/api/auth/whoami", {
                method: "POST",
                headers: useRequestHeaders(['cookie']) as Record<string, string>,
            });

            if (error.value) {
                return false;
            }

            userStore.update(data.value!)
            return true;
            ;
        };

        const userExist = await whoami();

        if (!userExist) { return navigateTo('/login'); }
    }
})