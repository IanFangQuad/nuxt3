
export default defineEventHandler(async (event) => {

    const token = getCookie(event, 'access_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const getUserInfo = async () => {

        const response = await $fetch("http://webapp/api/auth/whoami", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json', // laravel will return msg instead of redirect
            },
        });

        return response;
    };

    try {
        const response = await getUserInfo();
        return response;

    } catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})