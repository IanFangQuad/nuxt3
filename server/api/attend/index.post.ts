
export default defineEventHandler(async (event) => {

    const token = getCookie(event, 'access_token');

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const getRecord = async () => {

        const response: any = await $fetch("http://webapp/api/attend", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json', // laravel will return msg instead of redirect
            },
        });

        return response;
    };

    try {
        const response = await getRecord();
        console.log(response)
        return response;

    } catch (e) {
        
        deleteCookie(event, "access_token");

        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})