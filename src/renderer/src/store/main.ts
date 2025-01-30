import { defineStore } from 'pinia'
export const mainStore = defineStore('main', {
  state: () => ({
    translation: null,
    searchResult: null
  })
})
