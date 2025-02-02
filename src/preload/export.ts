import { ipcRenderer } from 'electron'
const exportAPI = {
  exportCard: async (data: any) => {
    return await ipcRenderer.invoke('card:export-data', data)
  },
  exportSound: async (data: any) => {
    return await ipcRenderer.invoke('card:export-sound', data)
  }
}
export default exportAPI
