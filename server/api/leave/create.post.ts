
export default defineEventHandler(async (event) => {

    const token = getCookie(event, 'access_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const body = await readBody(event);

    const create = async () => {

        const response: any = await $fetch(`http://webapp/api/leave`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json', // laravel will return msg instead of redirect
            },
            body: body,
        });

        return response;
    };

    try {
        const response = await create();
        return response;

    } catch (e) {

        deleteCookie(event, "access_token");

        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})