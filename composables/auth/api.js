import { useAuthStore } from "./store"

export const useLogin = async (email, password) => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()
  await $fetch(config.baseURL + '/sanctum/csrf-cookie', {
    method: 'GET',
    credentials: 'include'
  })
  const token = useCookie('XSRF-TOKEN').value
  const { loginResponse } = await $fetch(config.baseURL + '/login', {
    async onResponse({ request, response, options }) {
      if (response.ok) {
        auth.authenticated = true
        auth.error = false
        auth.message = ''
        const authenticated = useCookie('authenticated')
        const profile = useCookie('profile')
        authenticated.value = true
        profile.value = response
      }
    },
    async onResponseError({ request, response, options }) {
      auth.authenticated = false
      auth.error = true
      auth.message = response._data.message
    },
    method: 'POST',
    credentials: 'include',
    headers: {
      'X-XSRF-TOKEN': token,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: {
      "email": email,
      "password": password
    }    
  }).catch((error) => error.data)
  return loginResponse
}