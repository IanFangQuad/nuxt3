import { OAuth2Client } from 'google-auth-library'

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const oauth2Client = new OAuth2Client()
    oauth2Client.setCredentials({ access_token: body.accessToken })

    const userInfo = await oauth2Client
        .request({
            url: 'https://www.googleapis.com/oauth2/v3/userinfo'
        })
        .then((response) => response.data)
        .catch(() => null)

    oauth2Client.revokeCredentials()

    if (!userInfo) {

        deleteCookie(event, 'access_token');

        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid token'
        })
    }

    const formData = {
        email: userInfo.email,
        third_party_id: userInfo.sub,
        third_party: 'google',
    };

    const getToken = async () => {

        const response = await $fetch("http://webapp/api/auth/login", {
            method: "POST",
            body: formData,
            onResponse({ response }) {
                return new Promise((resolve, reject) => {
                    response.ok ? resolve() : reject({ status: response.status, data: response._data })
                })
            },
        });

        return response;
    };

    let access_token = '';

    try {

        const { token, message } = await getToken();
        access_token = token;
        console.log(message)

        // 回應空 token 為資料庫找不到資料，表示第一次使用第三方登入，先幫他創會員再取一次
        if (!token) {

            formData.name = userInfo.name;

            const handleSignup = async () => {

                const { message } = await $fetch("http://webapp/api/user", {
                    method: "POST",
                    body: formData,
                    initialCache: false,
                    headers: {
                        Accept: 'application/json', // laravel will return msg instead of redirect
                    },
                });

                if (message !== 'register success') {
                    return false;
                }

                return true;
            }

            const signup = await handleSignup();

            if (!signup) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'something wrong, please try again.'
                })
            }

            const { token, message } = await getToken();
            access_token = token;
            console.log(message)
        }
    } catch (error) {
        console.log('error in catch')
        console.log(error);
    }

    const maxAge = 60 * 60 * 24 * 1
    const expires = Math.floor(Date.now() / 1000) + maxAge

    if (access_token) {
        setCookie(event, 'access_token', access_token, {
            httpOnly: true,
            maxAge,
            expires: new Date(expires * 1000),
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        })
    }

    return {
        name: userInfo.name,
        email: userInfo.email,
        third_party: 'google',
    }
})