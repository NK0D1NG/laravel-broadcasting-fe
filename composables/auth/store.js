import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      error: false,
      message: '',
      authenticated: false,
    }
  },
})
