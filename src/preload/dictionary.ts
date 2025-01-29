import { ipcRenderer } from 'electron'
const dictionaryAPI = {
  autoComplete: async (word: string) => await ipcRenderer.invoke('dictionary:auto-complete', word),
  search: async (words: string[]) => await ipcRenderer.invoke('dictionary:search', words)
}
export default dictionaryAPI
