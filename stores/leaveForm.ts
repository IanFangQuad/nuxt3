import { defineStore } from 'pinia'

export const useLeaveFormStore = defineStore('leaveForm', {
    state: () => ({
        show: false,
        editable: true,
        submitable: false,
        mode: 'create',
        data: {} as LeaveFormData,
        stash: {} as LeaveFormData,
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
            this.data = value;
        },
        put(key: string, value: any) {
            this.data[key as keyof LeaveFormData] = value;
        },
        setStash(value: LeaveFormData) {
            Object.assign(this.stash, reactive(value));
        },
        toggle(value: boolean) {
            this.show = value;
        }
    },
    getters: {
        getType: (state) => { return state.data.type ?? '' },
        getTitle: (state) => { return state.mode == "create" ? "Add leave" : "Detail" },
        getDays: (state) => { return state.data.hours ? state.data.hours / 24 : '' },
        getApproval: (state) => { return state.data.approval ? 'approved' : 'reviewing' },
        getAddDate: (state) => { return state.data.date },
        getStartDate: (state) => {
            const nuxtApp = useNuxtApp();
            return state.data.start ? nuxtApp.$dayjs(state.data.start).format('YYYY-MM-DD') : '';
        },
        getStartTime: (state) => {
            const nuxtApp = useNuxtApp();
            return state.data.start ? nuxtApp.$dayjs(state.data.start).format('HH:mm:ss') : '09:00:00';
        },
        getEndDate: (state) => {
            const nuxtApp = useNuxtApp();
            return state.data.end ? nuxtApp.$dayjs(state.data.end).format('YYYY-MM-DD') : nuxtApp.$dayjs(new Date()).format('YYYY-MM-DD');
        },
        getEndTime: (state) => {
            const nuxtApp = useNuxtApp();
            return state.data.end ? nuxtApp.$dayjs(state.data.end).format('HH:mm:ss') : '18:00:00';
        },
        getCalcMsg: (state): string => {

            if (!state.editable) {
                return '';
            }

            if (!state.data.start || !state.data.end) {
                return '';
            }

            if (state.mode === 'read') {
                if ((Object.entries(state!.stash).toString() === Object.entries(state!.data).toString())) {
                    return '';
                }
            }

            if (!state.data.type) {
                return 'please select type';
            }

            const nuxtApp = useNuxtApp();
            const start = nuxtApp.$dayjs(state.data.start);
            const end = nuxtApp.$dayjs(state.data.end);
            const dayoff = Object.fromEntries(Object.entries<{ dayoff: number }>(state.data.holidays!).filter(([key, value]) => {
                return value.dayoff == 1;
            }));
            let leaveCount = 0;

            if (start.diff(end) >= 0) {
                return 'end time must greater than start time';
            }

            const days = end.diff(start, 'days');
            let range = [];

            for (let i = 0; i <= days; i++) {
                let clone = start.clone();
                let date = clone.add(i, 'days').format('YYYY-MM-DD');
                if (!(date in dayoff)) {
                    range.push(date);
                }
            }

            let lastIndex = range.length == 0 ? 0 : range.length - 1;

            for (let i = 0; i <= lastIndex; i++) {

                let date = range[i];

                const afternoon = nuxtApp.$dayjs(date + ' 13:00:00', "YYYY-MM-DD hh:mm:ss");

                if (lastIndex == 0) {
                    const isAllDay = end.diff(start, 'hour') > 4;
                    leaveCount += isAllDay ? 1 : 0.5;
                    continue;
                }

                if (i == 0) {
                    const isStartFromMorning = (afternoon.diff(start) > 0);
                    leaveCount += isStartFromMorning ? 1 : 0.5;
                    continue;
                }

                if (i == lastIndex) {
                    const isEndAfterNoon = (afternoon.diff(end) < 0);
                    if (start.format('HH:mm:ss') == end.format('HH:mm:ss') && start.format('HH:mm:ss') == '09:00:00') {
                        leaveCount += 0;
                        continue;
                    }

                    leaveCount += isEndAfterNoon ? 1 : 0.5;
                    continue;
                }

                leaveCount += 1;

            }

            const unit = leaveCount > 1 ? 'days' : 'day';
            const msg = `you will use ${leaveCount} ${unit} for ${state.data.type} leave`;

            return msg;
        },
    }
})