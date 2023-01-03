export { };

declare global {

    interface UserInfo {
        email?: string;
        name?: string;
        sub?: string;
        avatar?: string;
        third_party?: string;
        third_party_id?: string;
        id?: bigint;
    }

    interface AuthResponse {
        message: string,
        token?: string,
        userinfo?: UserInfo,
    }

    interface AttendResponse { }

    interface ModalOptions {
        title?: string,
        content?: string,
        primary_btn_text?: string,
        primary_btn_show?: boolean,
        primaryBtnHandler?: Function,
        secondary_btn_text?: string,
        secondary_btn_show?: boolean,
        secondaryBtnHandler?: Function,
        danger_btn_text?: string,
        danger_btn_show?: boolean,
        dangerBtnHandler?: Function,
    }

    interface LeaveFormData {
        id?: number,
        member_id?: number,
        member?: UserInfo,
        start?: string,
        end?: string,
        hours?: number,
        type?: string,
        date?: string,
        description?: string,
        approval?: number,
        holidays?: { [key: string]: {
            dayoff : number,
        } },
    }

}