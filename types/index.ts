export { };

declare global {

    interface UserInfo {
        email: string;
        name?: string;
        sub?: string;
        avatar?: string;
        third_party?: string;
        third_party_id?: string;
        id?: bigint;
    }

    interface ApiResponse {
        message: string,
        token?: string,
        userinfo?: UserInfo,
    }

}