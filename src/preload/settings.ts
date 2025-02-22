import { ipcRenderer } from 'electron'
const settingAPI = {
  settingOptions: async () => {
    const options = await ipcRenderer.invoke('setting:get-options')
    return options
  },
  setSettings: async (options) => await ipcRenderer.invoke('setting:set-options', options)
}
export default settingAPI
