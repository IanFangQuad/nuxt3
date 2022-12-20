
export default defineEventHandler(async (event) => {

    const token = getCookie(event, 'access_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const body = await readBody(event);
    const id = body.id;
    const url = event.context.params.action == 'in' ? 'http://webapp/api/attend/store' : `http://webapp/api/attend/${id}`;
    const method = event.context.params.action == 'in' ? 'POST' : 'PATCH';
    const punch = async () => {

        const response: any = await $fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json', // laravel will return msg instead of redirect
            },
        });

        return response;
    };

    try {
        const response = await punch();
        return response;

    } catch (e) {

        deleteCookie(event, "access_token");

        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})