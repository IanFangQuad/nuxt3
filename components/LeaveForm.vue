<template>
    <ClientOnly>
        <div id=""
            class="z-10 bg-dark-50 bg-op-40 w-100vw h-120% position-absolute top-0 left-0 justify-center items-start"
            v-bind:class="show ? 'flex' : 'hidden'">
            <div id=""
                class="z-15 max-w-xl w-100% bg-white rounded px-1px flex flex-col items-center justify-start position-fixed top-7.5%">
                <div class="w-100% border-b border-warmgray-200 py-2 flex items-center">
                    <span class="mx-2 text-2xl fw-400 p-1.5">
                        {{ leaveFormStore.getTitle }}
                    </span>
                </div>
                <div class="w-100% rounded py-4">
                    <div id="" class="px-3">
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="name" class="mb-2">Name</label>
                            <input type="text"
                                class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide"
                                name="name" id="name" :value="info.name" disabled readonly />
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="type" class="mb-2"><span class="text-red-5 mr-1"
                                    :class="[editable ? '' : 'hidden']">*</span>Type</label>
                            <select
                                class="need-calc p-2.5 rounded text-0.9rem appearance-none border-1 tracking-wide disabled:op-100 disabled:text-dark-5 disabled:bg-truegray-1"
                                name="type" id="type" :value="leaveFormStore.getType" :disabled="!editable"
                                @change="handleCalcHours"
                                @input="leaveFormStore.put('type', (<HTMLInputElement>$event.target)?.value)">
                                <option value="" disabled selected>選擇假別</option>
                                <option value="annual">特休</option>
                                <option value="comp">補休</option>
                                <option value="personal">事假</option>
                                <option value="offical">公假</option>
                                <option value="marriage">婚假</option>
                                <option value="funeral">喪假</option>
                                <option value="menstrul">生理假</option>
                                <option value="maternity">產假</option>
                                <option value="paternity">陪產假</option>
                            </select>
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="start" class="mb-2"><span class="text-red-5 mr-1"
                                    :class="[editable ? '' : 'hidden']">*</span>Start</label>
                            <div class="flex items-center">
                                <span id="start-from"
                                    class="text-nowrap text-0.9rem border-1 border-truegray-5 rounded pl-2.5 pr-8.6 py-1.65 flex-grow bg-truegray-1"
                                    :class="[mode == 'create' ? '' : 'hidden']">
                                    {{ $dayjs(leaveFormStore.getAddDate).format('YYYY/MM/DD') }}
                                </span>
                                <input
                                    class="need-calc p-2 rounded border-1 text-0.9rem appearance-none font-sans h-20px flex-grow tracking-wide disabled:op-100 disabled:text-dark-5 disabled:bg-truegray-1"
                                    :class="[mode == 'read' ? '' : 'hidden']" :disabled="!editable" type="date"
                                    name="start-date" :value="leaveFormStore.getStartDate" id="start-date"
                                    @change="handleCalcHours"
                                    @input="(<HTMLInputElement>$event.target)?.value !== '' ? leaveFormStore.put('start', (<HTMLInputElement>$event.target)?.value + ' ' + $dayjs(data.start).format('HH:mm:ss')) : ''" />
                                <select
                                    class="need-calc p-2.5 rounded text-0.9rem appearance-none flex-grow tracking-wide ml-2 disabled:op-100 disabled:text-dark-5 disabled:bg-truegray-1"
                                    name="start-time" id="start-time" :value="leaveFormStore.getStartTime"
                                    :class="[editable || mode == 'read' ? '' : 'hidden']" :disabled="!editable"
                                    @change="handleCalcHours"
                                    @input="(<HTMLInputElement>$event.target)?.value !== '' ? leaveFormStore.put('start', $dayjs(data.start ? data.start : leaveFormStore.getAddDate).format('YYYY-MM-DD') + ' ' + (<HTMLInputElement>$event.target)?.value) : ''">
                                    <option value="09:00:00" selected>09:00</option>
                                    <option value="14:00:00">14:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="end" class="mb-2"><span class="text-red-5 mr-1"
                                    :class="[editable ? '' : 'hidden']">*</span>End</label>
                            <div class="flex items-center">
                                <input
                                    class="need-calc p-2 rounded border-1 text-0.9rem appearance-none font-sans h-20px flex-grow tracking-wide disabled:op-100 disabled:text-dark-5 disabled:bg-truegray-1"
                                    type="date" name="end-date" :value="leaveFormStore.getEndDate" :disabled="!editable"
                                    id="end-date" @change="handleCalcHours"
                                    @input="(<HTMLInputElement>$event.target)?.value !== '' ? leaveFormStore.put('end', (<HTMLInputElement>$event.target)?.value + ' ' + $dayjs(data.end).format('HH:mm:ss')) : ''" />
                                <select
                                    class="ml-2 need-calc p-2.5 rounded text-0.9rem appearance-none flex-grow tracking-wide disabled:op-100 disabled:text-dark-5 disabled:bg-truegray-1"
                                    name="end-time" id="end-time" :value="leaveFormStore.getEndTime"
                                    :disabled="!editable" @change="handleCalcHours"
                                    @input="(<HTMLInputElement>$event.target)?.value !== '' ? leaveFormStore.put('end', $dayjs(data.end).format('YYYY-MM-DD') + ' ' + (<HTMLInputElement>$event.target)?.value) : ''">
                                    <option value="13:00:00" selected>13:00</option>
                                    <option value="18:00:00">18:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="description" class="mb-2">Description</label>
                            <input
                                class="need-calc p-2.5 rounded text-0.9rem text-dark-5 border-1 appearance-none tracking-wide"
                                type="text" name="description" id="description" :value="data.description"
                                :disabled="!editable" @change="handleCalcHours"
                                @input="leaveFormStore.put('description', (<HTMLInputElement>$event.target)?.value)" />
                        </div>
                        <div id="usage-block" class="w-100% items-center mb-3"
                            :class="[(!editable && mode == 'read') ? 'flex' : 'hidden']">
                            <div class="flex flex-col flex-grow">
                                <label for="usage" class="mb-2">usage</label>
                                <div class="flex items-center">
                                    <input id="usage" type="text" name="usage"
                                        class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide"
                                        :value="leaveFormStore.getDays" disabled />
                                    <span id="time-unit" class="mx-2">days</span>
                                </div>
                            </div>
                            <div class="flex flex-col flex-grow">
                                <label for="approve" class="mb-2">approval</label>
                                <div class="flex items-center">
                                    <input id="approve" type="text" name="approve"
                                        class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide"
                                        :value="leaveFormStore.getApproval" disabled />
                                </div>
                            </div>
                        </div>
                        <div id="total" class="text-red-5 text-white my-2" :class="[editable ? '' : 'hidden']">
                            {{ leaveFormStore.getCalcMsg }}
                        </div>
                        <div class="justify-between" :class="[editable ? 'hidden' : 'hidden']">
                            <div>
                                <div class="text-red-5" id="error-msg">
                                    <ul class="list-none border border-2 border-red-5 rounded p-1 my-1">
                                        <li>{{}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100% rounded py-3 flex justify-end">
                    <div id="" class="px-3 flex space-x-2">
                        <button
                            class="bg-sky-5 shadow b-rounded items-center max-w-md cursor-pointer b-none disabled:bg-bluegray-3 disabled:hover:shadow-bluegray-2 disabled:hover:bg-op-100"
                            type="button" hover="shadow-sky bg-op-90" @click="handleSubmit()"
                            :class="[editable ? '' : 'hidden']" :disabled="!submitable">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>submit</b></p>
                            </div>
                        </button>
                        <button class="bg-amber-5 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-amber bg-op-90" @click="handleEdit()"
                            :class="[!editable && mode == 'read' ? '' : 'hidden']">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>&nbsp;edit&nbsp;</b></p>
                            </div>
                        </button>
                        <button class="bg-slate-4 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-slate bg-op-90"
                            :class="[editable && mode == 'read' ? 'hidden' : '']" @click="toggle(false)">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>close</b></p>
                            </div>
                        </button>
                        <button class="bg-slate-4 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-slate bg-op-90"
                            :class="[editable && mode == 'read' ? '' : 'hidden']" @click="handleCancelEdit()">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>cancel</b></p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Loading :show="loading"></Loading>
        <template #fallback>
            <Loading :show="true"></Loading>
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useLeaveFormStore } from "~~/stores/leaveForm";
import { useUserStore } from "~~/stores/user";
import { storeToRefs } from "pinia";

const props = defineProps({
    refresh: Function,
})

const loading = ref(false);

const userStore = useUserStore();
const { info } = storeToRefs(userStore);

const leaveFormStore = useLeaveFormStore();
const { set, setStash, put, canEdit, canSubmit, switchMode, toggle } = leaveFormStore;
const { show, mode, editable, submitable, data, getCalcMsg, stash } = storeToRefs(leaveFormStore);

const handleEdit = () => {
    canEdit(true);
    switchMode('read');
    canSubmit(false);
}

const handleCancelEdit = () => {
    canEdit(false);
    switchMode('read');
    canSubmit(false);
    set(stash.value);
}

const handleSubmit = async () => {

    loading.value = true;

    const url = (mode.value == 'read') ? '/api/leave/update' : '/api/leave/create';

    const { data: response, error } = await useFetch(url, {
        method: "POST",
        headers: useRequestHeaders(['cookie']) as Record<string, string>,
        body: data.value,
    });

    //console.log(response.value)

    if (error.value) {
        show.value = false;
        handleCancelEdit();
        navigateTo('/login');
    }

    if (mode.value == 'create') show.value = false;
    await props.refresh?.();
    setStash(data.value);
    handleCancelEdit();

    loading.value = false;
}

const handleCalcHours = () => {
    canSubmit(false);
    if (getCalcMsg.value.includes('you will use')) {
        if (!(Object.entries(stash.value).toString() === Object.entries(data.value).toString())) {
            canSubmit(true);
        }
    }
}
</script>
