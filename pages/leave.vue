<template>
    <NuxtLayout name="default">
        <template #header>
            <Header title="Leave">
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
                <div class="calendar-wrapper flex flex-wrap">
                    <div class="calendar-cell calendar-title">Sunday</div>
                    <div class="calendar-cell calendar-title">Monday</div>
                    <div class="calendar-cell calendar-title">Tuesday</div>
                    <div class="calendar-cell calendar-title">Wednesday</div>
                    <div class="calendar-cell calendar-title">Thursday</div>
                    <div class="calendar-cell calendar-title">Friday</div>
                    <div class="calendar-cell calendar-title">Saturday</div>

                    <div v-for="(day, index1) in data.dates" :key="index1"
                        class="calendar-cell calendar-date fw-bold text-1.1rem" :class="[day.dayoff ? 'text-red-6' : 'text-dark-3',
($dayjs(day.date).format('MM') == now.format('MM')) ? 'hover:bg-lightblue-50' : 'grayscale-50 text-op-50 bg-light-1 hover:bg-light-4',
($dayjs(day.date).format('YYYY-MM-DD') == $dayjs(new Date()).format('YYYY-MM-DD')) ? 'text-emerald-5 hover:bg-emerald-50!' : '',
]">
                        <div class="w-100% flex">
                            <div class="mx-1.5 my-0.75" :class="[]">
                                {{ ($dayjs(day.date).format('YYYY-MM-DD') == $dayjs(new Date()).format('YYYY-MM-DD')) ?
        'Today' : $dayjs(day.date).format('DD')
}}
                            </div>
                            <div class="p-0 whitespace-nowrap flex flex-grow justify-center items-center calendar-annotation"
                                :class="[day.dayoff ? 'text-red-6' : 'text-dark-3', ($dayjs(day.date).format('MM') == now.format('MM')) ? '' : 'text-op-50']">
                                {{ day.annotation }}
                            </div>
                        </div>
                        <div class="tag-wrapper" ref="tagwapper">
                            <div v-for="event, index2 in day.events" :key="index1 + '-' + event.id"
                                :ref="index1 + '-' + event.id"
                                class="border-dashed border-1 border-gray-4 rounded event-tag my-2 mb-2.5 mx-2 px-1 hover:border-solid position-relative">
                                <div class="flex items-baseline my-1.25 flex-wrap">
                                    <div class="p-0 ml-1 fw-bold text-dark-1 text-0.9rem">
                                        {{ event.member.name }}
                                    </div>
                                    <div class="p-0 ml-1">
                                        <span class="text-dark-1 text-0.4rem rounded bg-amber-3 px-1">
                                            {{ convertMap[event.type as keyof typeof convertMap] }}
                                        </span>
                                    </div>
                                </div>

                                <div class="text-dark-1 p-0 mx-1 mb-1.25 text-0.5rem">{{ event.description }}</div>

                                <span
                                    class="text-white fw-bold text-0.5rem mx-1 mb-1 rounded px-1 position-absolute right--0.5rem top--0.5rem"
                                    :class="[event.approval ? 'bg-green-6' : 'bg-rose-5']">
                                    {{ event.approval ? 'approved' : 'reviewing' }}
                                </span>

                                <div class="tag-tool justify-around my-1">
                                    <div title="information"
                                        class="i-mdi-information-outline text-1.25rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                                        :data-date="index1" :data-event="index2" @click="handleInfo($event)" />
                                    <div title="delete"
                                        class="i-mdi-delete-outline text-1.25rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                                        :data-date="index1" :data-event="index2" @click="handleDelete($event)" />
                                    <div title="approve"
                                        class="i-mdi-checkbox-marked-circle-outline text-1.25rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                                        :class="[info.type == 'admin' ? '' : 'hidden']" :data-date="index1"
                                        :data-event="index2" @click="handleApprove($event)" />
                                </div>
                            </div>

                            <div title="add"
                                class="i-mdi-plus-circle-outline calendar-add text-1.5rem text-sky-6 cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                                :class="[($dayjs().diff(day.date, 'day') > 0) && (info.type !== 'admin') ? 'hidden!' : '']"
                                :data-date="index1" @click="handleAdd($event)" />
                        </div>

                        <div title="scroll top"
                            class="i-mdi-arrow-up-circle calendar-top text-1.25rem cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                            :class="[day.events.length >= 2 ? '' : 'hidden']" :data-date="index1"
                            @click="handleScrollTop($event)" />
                        <div title="scroll down"
                            class="i-mdi-arrow-down-circle calendar-more text-1.25rem cursor-pointer shadow hover:bg-sky-5 shadow-blue"
                            :class="[day.events.length >= 2 ? '' : 'hidden']" :data-date="index1"
                            @click="handleScrollDown($event)" />
                    </div>
                </div>
            </div>
            <LeaveForm :refresh="refresh"></LeaveForm>
            <Modal />
        </template>
    </NuxtLayout>
</template>

<style scoped src="/assets/css/calendar.css">

</style>

<script setup lang="ts">
import { useLeaveFormStore } from "~~/stores/leaveForm";
import { useModalStore } from "~~/stores/modal";
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from 'pinia';

definePageMeta({
    middleware: ['auth'],
})

const userStore = useUserStore();
const { info } = storeToRefs(userStore);

const nuxtApp = useNuxtApp();
const now = ref(nuxtApp.$dayjs(new Date()));

// fetch and render
const { data, error, refresh } = await useFetch("/api/leave/show", {
    method: "POST",
    headers: useRequestHeaders(['cookie']) as Record<string, string>,
});

//console.log(data.value)

if (error.value) {
    navigateTo('/login');
}

// pagenation
const loading = ref(false);

const handlePage = async (action: string) => {

    loading.value = true;

    now.value = action == 'add' ? now.value.add(1, 'month') : now.value.subtract(1, 'month');
    const year = now.value.format('YYYY');
    const month = now.value.format('MM');

    const { data: response, error } = await useFetch(`/api/leave/show`, {
        method: "POST",
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        query: { y: year, m: month },
    });

    loading.value = false;

    if (error.value) {
        navigateTo('/login');
    }

    data.value = response.value;
}

// scroll button
const tagwapper = ref<HTMLInputElement[] | null>(null);

const handleScrollDown = (event: Event) => {

    const target = event.target as HTMLElement;
    const dateIndex = +target.getAttribute('data-date')! as number;

    tagwapper.value![dateIndex].scrollBy({ top: 50, behavior: 'smooth' });

}

const handleScrollTop = (event: Event) => {

    const target = event.target as HTMLElement;
    const dateIndex = +target.getAttribute('data-date')! as number;

    tagwapper.value![dateIndex].scrollTo({ top: 0, behavior: 'smooth' });

}

// leave CRUD
const leaveFormStore = useLeaveFormStore();
const { set, setStash, canEdit, canSubmit, switchMode, toggle } = leaveFormStore;
const modalStore = useModalStore();
const { toggle: modalToggle, set: modalSet } = modalStore;
// const { show, mode, editable, submitable } = storeToRefs(leaveFormStore);

const handleInfo = async (event: Event) => {

    const target = event.target as HTMLElement;
    const dateIndex = target.getAttribute('data-date');
    const eventIndex = target.getAttribute('data-event');
    const { id, member_id, type, start, end, description, hours, member, approval } = data.value.dates[dateIndex!].events[eventIndex!];
    const { date } = data.value.dates[dateIndex!];
    const holidays = data.value.holidays;

    console.log(data.value.dates[dateIndex!]);
    const formData: LeaveFormData = {
        id: id,
        // date: date,
        member_id: member_id,
        type: type,
        start: start,
        end: end,
        description: description,
        hours: hours,
        member: member,
        holidays: holidays,
        approval: approval,
    }

    toggle(true);
    set(formData);
    setStash(formData);
    canEdit(false);
    canSubmit(false);
    switchMode('read');
}

const handleAdd = async (event: Event) => {
    const target = event.target as HTMLElement;
    const dateIndex = target.getAttribute('data-date');
    const holidays = data.value.holidays;
    const { date } = data.value.dates[dateIndex!];
    set({
        date: date,
        holidays: holidays,
        start: date + ' 09:00:00',
        end: date + ' 18:00:00',
    });
    setStash({});
    toggle(true);
    canEdit(true);
    canSubmit(false);
    switchMode('create');
}

const handleDelete = async (event: Event) => {
    const target = event.target as HTMLElement;
    const dateIndex = target.getAttribute('data-date');
    const eventIndex = target.getAttribute('data-event');
    const { id } = data.value.dates[dateIndex!].events[eventIndex!];

    const destrioy = async () => {
        loading.value = true;

        const { data: response, error } = await useFetch(`/api/leave/delete`, {
            method: "POST",
            headers: useRequestHeaders(['cookie']) as Record<string, string>,
            body: { id: id },
        });

        if (error.value) {
            modalToggle();
            navigateTo('/login');
        }

        await refresh();
        modalToggle();
        loading.value = false;
    };

    modalSet({
        title: 'system message',
        content: 'Want to delete this leave ?',
        danger_btn_show: true,
        dangerBtnHandler: () => { destrioy() },
        primary_btn_show: false,
        secondaryBtnHandler: () => { modalToggle() },
    });
    modalToggle();
}

const handleApprove = async (event: Event) => {
    const target = event.target as HTMLElement;
    const dateIndex = target.getAttribute('data-date');
    const eventIndex = target.getAttribute('data-event');
    const { id } = data.value.dates[dateIndex!].events[eventIndex!];

    const approve = async () => {
        loading.value = true;

        const { data: response, error } = await useFetch(`/api/leave/approve`, {
            method: "POST",
            headers: useRequestHeaders(['cookie']) as Record<string, string>,
            body: { id: id },
        });

        if (error.value) {
            modalToggle();
            navigateTo('/login');
        }

        await refresh();
        modalToggle();
        loading.value = false;
    };

    modalSet({
        title: 'system message',
        content: 'approve this leave ?',
        danger_btn_show: true,
        dangerBtnHandler: () => { approve() },
        primary_btn_show: false,
        secondaryBtnHandler: () => { modalToggle() },
    });
    modalToggle();

}

const convertMap = {
    annual: '??????',
    comp: '??????',
    personal: '??????',
    offical: '??????',
    marriage: '??????',
    funeral: '??????',
    menstrul: '?????????',
    maternity: '??????',
    paternity: '?????????',
}
</script>