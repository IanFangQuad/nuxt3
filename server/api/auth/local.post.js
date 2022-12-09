// const axios = require('axios');

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const getToken = async () => {
        const data = await fetch("http://127.0.0.1/api/auth/login", {
            method: "POST",
            body: JSON.stringify(toRaw(body)),
        });

        return data;
    };
    // const axiosget = await axios.post("http://localhost/api/auth/login", body);
    // console.log(axiosget)

    try {
        const token = await getToken();
    } catch (error) {
        console.log(error)
    }
    
    console.log(token);
    return token
    // const userInfo = await oauth2Client
    //     .request({
    //         url: 'https://www.googleapis.com/oauth2/v3/userinfo'
    //     })
    //     .then((response) => response.data)
    //     .catch(() => null)

    // oauth2Client.revokeCredentials()

    // if (!userInfo) {
    //     throw createError({
    //         statusCode: 400,
    //         statusMessage: 'Invalid token'
    //     })
    // }

    // setCookie(event, 'access_token', jwtToken, {
    //     httpOnly: true,
    //     maxAge,
    //     expires: new Date(expires * 1000),
    //     secure: process.env.NODE_ENV === 'production',
    //     path: '/'
    // })

    // return {
    //     id: userInfo.sub,
    //     name: userInfo.name,
    //     avatar: userInfo.picture,
    //     email: userInfo.email,
    //     emailVerified: userInfo.email_verified,
    // }
})