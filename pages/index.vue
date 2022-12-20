<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Punch card">
                <LogoutBtn />
            </Header>
            <Sider />
        </template>
        <template #content>
            <div class="container mx-auto">
                <div class="mt-15 text-6">
                    <div class="flex justify-center my-5">
                        <span class="mx-3 ">{{ $dayjs(new Date()).format('YYYY/MM/DD') }}</span>
                        <span class="mx-5">{{ $dayjs(new Date()).format('dddd') }}</span>
                    </div>
                    <div class="">
                        <ClientOnly>
                            <div class="flex justify-center text-5rem font-mono" id="clock">
                                {{ now }}
                            </div>
                            <template #fallback>
                                <div class="flex justify-center text-5rem font-mono">
                                    {{ '00:00:00' }}
                                </div>
                            </template>
                        </ClientOnly>
                    </div>
                    <div class="flex justify-center my-2rem">
                        <button
                            class="bg-indigo-5 w-100% h-5rem shadow b-rounded flex items-center max-w-md cursor-pointer b-none my-3 mt-5"
                            type="button" hover="shadow-indigo bg-op-90" @click="handlePunch">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-2 text-1.75rem"><b>Punch</b></p>
                            </div>
                        </button>
                    </div>
                    <Loading :show="loading" />
                </div>
            </div>
            <div class="">
                <h3 class=" max-w-4xl mx-auto text-1.5rem">today's record</h3>
                <div class="flex justify-center">
                    <table class=" mb-3 max-w-4xl w-100% text-start border-collapse">
                        <thead>
                            <tr class="">
                                <th class="text-start border-b-1.5px py-3" scope="">date</th>
                                <th class="text-start  border-b-1.5px " scope="">action</th>
                                <th class="text-start  border-b-1.5px " scope="">time</th>
                                <th class="text-start  border-b-1.5px " scope="">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-3">
                                <td class="pl-4" rowspan="2">{{ $dayjs(new Date()).format('YYYY/MM/DD') }}</td>
                                <td class="pl-4 py-4 ">punch in</td>
                                <td class="pl-4 " :rowspan="tableSpan" :colspan="tableSpan"
                                    :class="showTableCell ? '' : 'text-center'">{{ startTime }}</td>
                                <td class="pl-4 text-red-5 fw-bold" :class="{ hidden: !showTableCell }">{{ startStatus
                                }}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-3">
                                <td class="pl-4 py-4">punch out</td>
                                <td class="pl-4" :class="{ hidden: !showTableCell }">{{ endTime }}</td>
                                <td class="pl-4 text-red-5 fw-bold" :class="{ hidden: !showTableCell }">{{ endStatus }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useModalStore } from "~~/stores/modal";

definePageMeta({
    middleware: ['auth'],
})

const nuxtApp = useNuxtApp();
const now = ref(nuxtApp.$dayjs(new Date()).format('HH:mm:ss'));

// clock
const showTime = () => {
    const date = new Date();
    let h = date.getHours() as any; // 0 - 23
    let m = date.getMinutes() as any; // 0 - 59
    let s = date.getSeconds() as any; // 0 - 59

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    now.value = h + ":" + m + ":" + s;

    setTimeout(showTime, 1000);
}

showTime();

// fetch today's record and render
const { data, error, refresh } = await useFetch("/api/attend", {
    method: "POST",
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
});

const showTableCell = ref(false);
const tableSpan = ref(2);
const startTime = ref('not punch yet !');
const endTime = ref('not punch yet !');
const startStatus = ref('');
const endStatus = ref('');

if (data.value) {
    showTableCell.value = true;
    tableSpan.value = 1;
    startTime.value = data.value.start_time ? data.value.start_time : 'not punch yet !';
    endTime.value = data.value.end_time ? data.value.end_time : 'not punch yet !';
    startStatus.value = data.value.status.start_time ? data.value.status.start_time : '';
    endStatus.value = data.value.status.end_time ? data.value.status.end_time : '';
}

// punch card
const loading = ref(false);

const modalStore = useModalStore();
const { toggle, set } = modalStore;

const modalOptions: ModalOptions = reactive({
    title: 'warning',
    secondary_btn_text: 'close',
    secondary_btn_show: true,
    primary_btn_show: false,
    secondaryBtnHandler: () => { toggle() },
})

const handlePunch = async () => {

    loading.value = true;

    const action = data.value ? 'out' : 'in';
    const id = data.value ? data.value.id : 0;

    const { data: response, error } = await useFetch(`/api/attend/punch/${action}`, {
        method: "POST",
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        body: { id: id },
    });

    loading.value = false;
    
    if (error.value) {
        modalOptions.content = error.value.data.message;
        set(modalOptions);
        toggle();
        return;
    }

    await refresh();
    if (data.value) {
        showTableCell.value = true;
        tableSpan.value = 1;
        startTime.value = data.value.start_time ? data.value.start_time : 'not punch yet !';
        endTime.value = data.value.end_time ? data.value.end_time : 'not punch yet !';
        startStatus.value = data.value.status.start_time ? data.value.status.start_time : '';
        endStatus.value = data.value.status.end_time ? data.value.status.end_time : '';
    }
}

</script>
