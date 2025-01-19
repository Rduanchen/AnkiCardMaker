import { ipcRenderer } from 'electron'
const settingAPI = {
  settingOptions: async () => await ipcRenderer.invoke('setting:get-options')
}
export default settingAPI
