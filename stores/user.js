import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        info: {}
    }),
    actions: {
        update(value) {
            Object.assign(this.info, value);
        }
    },
    getters: {
    }
})