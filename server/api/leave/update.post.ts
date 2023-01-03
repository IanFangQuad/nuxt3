
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

    const update = async () => {

        const response: any = await $fetch(`http://webapp/api/leave/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json', // laravel will return msg instead of redirect
            },
            body: body,
        });

        return response;
    };

    try {
        const response = await update();
        return response;

    } catch (e) {

        deleteCookie(event, "access_token");

        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})