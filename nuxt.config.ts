// https://v3.nuxtjs.org/api/configuration/nuxt.config
// https://pinia.vuejs.org/ssr/nuxt.html

export default defineNuxtConfig({
    ssr: false,
    modules: [
        '@nuxtjs/tailwindcss',
    ],
    buildModules: [
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        public: {
          baseURL: 'http://localhost'
        }
      }
  })
