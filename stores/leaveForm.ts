import { defineStore } from 'pinia'

export const useLeaveFormStore = defineStore('leaveForm', {
    state: () => ({
        show: true,
        editable: true,
        submitable: false,
        mode: 'create',
        data: {},
    }),
    actions: {
        canEdit(value: boolean) {
            this.editable = value;
        },
        canSubmit(value: boolean) {
            this.submitable = value;
        },
        switchMode(mode: string) {
            const modes = ['create', 'read'];
            if (modes.includes(mode)) {
                this.mode = mode;
            }
        },
        set(value: LeaveFormData) {
            Object.assign(this.data, reactive(value));
        },
        toggle(value: boolean) {
            this.show = value;
        }
    },
    getters: {
    }
})