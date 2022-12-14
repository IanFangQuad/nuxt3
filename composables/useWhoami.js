//this is testing func
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";

export default function () {

    const whoami = async () => {

        const userStore = useUserStore();

        const modalStore = useModalStore();
        const { update, toggle, set } = modalStore; // action 可以直接解構

        const modalOptions = reactive({
            title: 'system message',
            content: 'please login.',
            primary_btn_text: '  ok  ',
            primary_btn_show: true,
            secondary_btn_show: false,
            primaryBtnHandler: () => {
                toggle();
                navigateTo("/login");
            },
        })

        if (Object.keys(userStore.info).length === 0) {

            (async () => {

                const { data, error } = await useFetch("/api/auth/whoami", {
                    method: "POST",
                    initialCache: false,
                    headers: useRequestHeaders(['cookie']),
                });

                if (error.value) {
                    set(modalOptions);
                    update(true); // toggle 目前會有生命週期問題
                    return;
                }

                userStore.update(data.value);

            })();
        }
    }

    return {
        whoami,
    }
}