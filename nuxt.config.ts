// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@unocss/nuxt", "@pinia/nuxt"],
  unocss: {
    // presets
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,

    // core options
    shortcuts: [],
    rules: [],
  },
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
