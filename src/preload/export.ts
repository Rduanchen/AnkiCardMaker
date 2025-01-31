import { ipcRenderer } from 'electron'
const exportAPI = {
  exportCard: async (data: any) => {
    console.log('preload exportCard')
    return await ipcRenderer.invoke('card:export-data', data)
  }
}
export default exportAPI
