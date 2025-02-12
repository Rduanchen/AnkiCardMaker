import { ipcRenderer } from 'electron'
const settingAPI = {
  settingOptions: async () => await ipcRenderer.invoke('setting:get-options'),
  setSettings: async (options) => await ipcRenderer.invoke('setting:set-options', options)
}
export default settingAPI
