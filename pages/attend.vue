<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Attendance">
                <LogoutBtn />
            </Header>
            <Sider />
        </template>
        <template #content>
            <div class="container mx-auto">
                <div class="mt-5 text-1.8rem">
                    <div class="flex justify-start items-center my-5 px-1rem">
                        <div class="i-mdi-chevron-left text-2.5rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                            @click="handlePage('sub')" />
                        <span class="mx-3 ">{{ now.format('YYYY / MM MMMM') }}</span>
                        <div class="i-mdi-chevron-right text-2.5rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                            @click="handlePage('add')" />
                    </div>
                    <Loading :show="loading" />
                </div>
                <div class="flex justify-center">
                    <table class="mb-3 max-w-4xl w-100% text-start border-collapse">
                        <thead>
                            <tr>
                                <th class="text-start border-b-1.5px py-4">date</th>
                                <th class="text-start border-b-1.5px py-4">punch in</th>
                                <th class="text-start border-b-1.5px py-4">punch out</th>
                                <th class="text-start border-b-1.5px py-4">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-3" :class="{ hidden: !hasRecord }"
                                v-for="(record, date) in data" :key="date">
                                <td class="pl-4 py-3 font-mono">{{ date }}</td>
                                <td class="pl-4 font-mono">{{ 'start_time' in record ? record.start_time : '' }}</td>
                                <td class="pl-4 font-mono">{{ 'end_time' in record ? record.end_time : '' }}</td>
                                <td class="pl-4 fw-bold text-red-5">{{ 'status' in record ? record.status : 'absent' }}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-3" :class="{ hidden: hasRecord }">
                                <td colspan="4" class="pl-4 py-4 text-center"> we don't have future records</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ['auth'],
})
const nuxtApp = useNuxtApp();
const now = ref(nuxtApp.$dayjs(new Date()));

// fetch records and render
const { data, error } = await useFetch("/api/attend/list", {
    method: "POST",
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
});

if(error.value){
    navigateTo('/login');
}

const hasRecord = Object.keys(data.value).length === 0 ? ref(false) : ref(true);
// console.log(data)

// pagenation
const loading = ref(false);

const handlePage = async (action: string) => {

    loading.value = true;

    now.value = action == 'add' ? now.value.add(1, 'month') : now.value.subtract(1, 'month');
    const year = now.value.format('YYYY');
    const month = now.value.format('MM');

    const { data: response, error } = await useFetch(`/api/attend/list`, {
        method: "POST",
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        query: { y: year, m: month },
    });

    loading.value = false;

    if (error.value) {
        navigateTo('/login');
    }
    
    data.value = response.value;
    hasRecord.value = Object.keys(response.value).length === 0 ? false : true;
}

</script>
