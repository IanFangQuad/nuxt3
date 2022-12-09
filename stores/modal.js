import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        show: false,
        options: {
            title: 'title',
            content: 'content',
            primary_btn_text: 'submit',
            primary_btn_show: true,
            primaryBtnHandler: () => { },
            secondary_btn_text: 'close',
            secondary_btn_show: true,
            secondaryBtnHandler: () => { this.toggle() },
            danger_btn_text: 'check',
            danger_btn_show: false,
            dangerBtnHandler: () => { },
        }
    }),
    actions: {
        update(value) {
            this.show = value;
        },
        toggle() {
            this.show = !this.show;
        },
        set(value) {
            Object.assign(this.options, reactive(value));
        }
    },
    getters: {
        getOption: (state) => { return state.options },
    }
})