// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      googleClientId:
        "184232294480-a8uo2q8tmsllj93vtoirfagl9b9cqdj6.apps.googleusercontent.com",
    },
    jwtSignSecret: "SECRET KEY",
  },
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0'
      }
    }
  },
});
