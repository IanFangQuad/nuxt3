import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        info: {} as UserInfo
    }),
    actions: {
        update(value: UserInfo) {
            Object.assign(this.info, value);
        }
    },
    getters: {
    }
})