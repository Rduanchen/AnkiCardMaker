import { ipcRenderer } from 'electron'
const dictionaryAPI = {
  autoComplete: async (word: string) => await ipcRenderer.invoke('dictionary:auto-complete', word)
}
export default dictionaryAPI
