interface Response {
    message: string;
}

export default defineEventHandler(async (event) => {
    const token = getCookie(event, "access_token");

    const logout = async () => {

        const response: Response = await $fetch("http://webapp/api/auth/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json", // laravel will return msg instead of redirect
            },
        });

        return response;
    };

    try {
        const response = await logout();
        const { message } = response;

        deleteCookie(event, "access_token");

        return message;
    } catch (error) {
        console.log(error);
    }
});
