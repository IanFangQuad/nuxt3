
export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const getToken = async () => {

        // server to server 時，domain 用 docker-compose.yml 裡的 <appname>
        const response = await $fetch("http://webapp/api/auth/login", {
            method: "POST",
            body: body,
        });

        return response;
    };

    try {

        const response = await getToken();
        const { token, message } = response;

        const maxAge = 60 * 60 * 24 * 1
        const expires = Math.floor(Date.now() / 1000) + maxAge

        setCookie(event, 'access_token', token, {
            httpOnly: true,
            maxAge,
            expires: new Date(expires * 1000),
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        })

        return message;

    } catch (error) {
        console.log(error)
    }
})