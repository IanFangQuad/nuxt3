<template>
    <ClientOnly>
        <div id=""
            class="z-10 bg-dark-50 bg-op-40 w-100vw h-100vh position-absolute top-0 left-0 justify-center items-start"
            v-bind:class="show ? 'flex' : 'hidden'">
            <div id=""
                class="z-15 max-w-xl w-100% bg-white rounded mt-5vh px-1px flex flex-col items-center justify-start">
                <div class="w-100% border-b border-warmgray-200 py-2 flex items-center">
                    <span class="mx-2 text-2xl fw-400 p-1.5">
                        {{ title }}
                    </span>
                </div>
                <div class="w-100% rounded py-4">
                    <div id="" class="px-3"> 
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="name" class="mb-2">Name</label>
                            <input type="text" class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide" name="name" id="name" value="123特休" disabled readonly />
                                
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="type" class="mb-2"><span class="text-red-5 mr-1" :class="[]">*</span>Type</label>
                            <select class="need-calc p-2.5 rounded text-0.9rem appearance-none border-1 tracking-wide" name="type" id="type" value="">
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
                            <label for="start" class="mb-2"><span
                                class="text-red-5 mr-1" :class="[]">*</span>Start</label>
                            <div class="flex items-center">
                                <span id="start-from" class="text-nowrap mx-3" :class="['hidden']">{{}}</span>
                                <input class="need-calc p-2 rounded border-1 text-0.9rem appearance-none font-sans h-20px flex-grow tracking-wide" :class="[]" type="date" name="start-date"
                                    value="" id="start-date">
                                <select class="ml-2 need-calc p-2.5 rounded text-0.9rem appearance-none flex-grow tracking-wide" name="start-time" id="start-time" value="">
                                    <option value="09:00:00" selected>09:00</option>
                                    <option value="14:00:00">14:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="end" class="mb-2"><span class="text-red-5 mr-1" :class="[]">*</span>End</label>
                            <div class="flex items-center">
                                <input class="need-calc p-2 rounded border-1 text-0.9rem appearance-none font-sans h-20px flex-grow tracking-wide" type="date" name="end-date"
                                    value="" id="end-date">
                                <select class="ml-2 need-calc p-2.5 rounded text-0.9rem appearance-none flex-grow tracking-wide" name="end-time" id="end-time" value="">
                                    <option value="13:00:00">13:00</option>
                                    <option value="18:00:00">18:00</option>
                                </select>
                            </div>

                        </div>
                        <div class="mb-3 w-100% flex flex-col">
                            <label for="description" class="mb-2">Description</label>
                            <input class="need-calc p-2.5 rounded text-0.9rem text-dark-5 border-1 appearance-none tracking-wide" type="text" name="description" id="description"
                                value="">
                        </div>
                        <div id="usage-block" class="w-100% flex items-center mb-3" :class="[]">
                            <div class="flex flex-col flex-grow">
                                <label for="usage" class="mb-2">usage</label>
                                <div class="flex items-center">
                                    <input id="usage" type="text" name="usage" class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide" value="" disabled>
                                    <span id="time-unit" class="mx-2">days</span>
                                </div>
                            </div>
                            <div class="flex flex-col flex-grow">
                                <label for="approve" class="mb-2">approval</label>
                                <div class="flex items-center">
                                    <input id="approve" type="text" name="approve" class="p-2.5 rounded text-0.9rem text-dark-5 border-1 bg-truegray-1 appearance-none tracking-wide" value=""
                                        disabled>
                                </div>
                            </div>
                        </div>
                        <div id="total" class="text-red-5 text-white my-2">you will use XX days for XX</div>
                        <div class="justify-between" :class="['hidden']">
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
                        <button class="bg-sky-5 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-sky bg-op-90" @click="" :class="[submitable ? '' : 'hidden']">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>submit</b></p>
                            </div>
                        </button>
                        <button class="bg-amber-5 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-amber bg-op-90" @click=""
                            :class="[(editable && mode == 'read') ? '' : 'hidden']">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>&nbsp;edit&nbsp;</b></p>
                            </div>
                        </button>
                        <button class="bg-slate-4 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            type="button" hover="shadow-slate bg-op-90" @click="toggle(false)">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>close</b></p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <template #fallback>
            <Loading :show="true"></Loading>
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useLeaveFormStore } from "~~/stores/leaveForm";
import { storeToRefs } from 'pinia';

const leaveFormStore = useLeaveFormStore();
const { set, canEdit, canSubmit, switchMode, toggle } = leaveFormStore;
const { show, mode, editable, submitable } = storeToRefs(leaveFormStore);

const title = (mode.value == 'create') ? 'Add leave' : 'Detail';

</script>
