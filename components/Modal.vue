<template>
    <ClientOnly>
        <div id="modal-wrapper"
            class="z-10 bg-dark-50 bg-op-40 w-100vw h-120% position-absolute top-0 left-0 justify-center items-start"
            v-bind:class="show ? 'flex' : 'hidden'">
            <div id="modal"
                class="z-15 max-w-md w-100% bg-white rounded px-1px flex flex-col items-center justify-start position-fixed top-25vh">
                <div class="w-100% border-b border-warmgray-200 py-2 flex items-center">
                    <span class="mx-3 text-2xl fw-400">
                        {{ options.title }}
                    </span>
                </div>
                <div class="w-100% rounded py-4">
                    <div id="modal-content" class="px-3">
                        {{ options.content }}
                    </div>
                </div>
                <div class="w-100% rounded py-3 flex justify-end">
                    <div id="modal-footer" class="px-3 flex space-x-2">
                        <button class="bg-sky-5 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            v-bind:class="options.primary_btn_show ? 'flex' : 'hidden'" type="button"
                            hover="shadow-sky bg-op-90" @click="options.primaryBtnHandler">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>{{ options.primary_btn_text }}</b></p>
                            </div>
                        </button>
                        <button class="bg-rose-6 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            v-bind:class="options.danger_btn_show ? 'flex' : 'hidden'" type="button"
                            hover="shadow-red bg-op-90" @click="options.dangerBtnHandler">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>{{ options.danger_btn_text }}</b></p>
                            </div>
                        </button>
                        <button class="bg-slate-4 shadow b-rounded items-center max-w-md cursor-pointer b-none"
                            v-bind:class="options.secondary_btn_show ? 'flex' : 'hidden'" type="button"
                            hover="shadow-slate bg-op-90" @click="options.secondaryBtnHandler">
                            <div class="flex items-center justify-center flex-grow">
                                <p class="text-white mx-1 my-2"><b>{{ options.secondary_btn_text }}</b></p>
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
import { useModalStore } from "~~/stores/modal";
import { storeToRefs } from 'pinia'

const modalStore = useModalStore();
// action ??????????????????
const { set } = modalStore;
// state ????????????????????? reactive???????????? storeToRefs(?????? getters ??????
const { show, options } = storeToRefs(modalStore);

// // ??????????????????????????????????????????????????????????????????
// const { custom } = defineProps({ 
//     custom: Object,
// });

// // store ??????????????????????????????????????? options
// const setting = {
//     title: ('title' in custom) ? custom.title : options.title,
//     content: ('content' in custom) ? custom.content : options.content,
//     primary_btn_text: ('primary_btn_text' in custom) ? custom.primary_btn_text : options.primary_btn_text,
//     primary_btn_show: ('primary_btn_show' in custom) ? custom.primary_btn_show : options.primary_btn_show,
//     primaryBtnHandler: ('primaryBtnHandler' in custom) ? custom.primaryBtnHandler : options.primaryBtnHandler,
//     secondary_btn_text: ('secondary_btn_text' in custom) ? custom.secondary_btn_text : options.secondary_btn_text,
//     secondary_btn_show: ('secondary_btn_show' in custom) ? custom.secondary_btn_show : options.secondary_btn_show,
//     secondaryBtnHandler: ('secondaryBtnHandler' in custom) ? custom.secondaryBtnHandler : options.secondaryBtnHandler,
//     danger_btn_text: ('danger_btn_text' in custom) ? custom.danger_btn_text : options.danger_btn_text,
//     danger_btn_show: ('danger_btn_show' in custom) ? custom.danger_btn_show : options.danger_btn_show,
//     dangerBtnHandler: ('dangerBtnHandler' in custom) ? custom.dangerBtnHandler : options.dangerBtnHandler,
// };

// // ????????? store???options ??? reactive ???????????? rerender component
// set(setting);
</script>