const { ipcMain } = require('electron')
const Settings = import('./setting-modal')
import settingsOption from './dictionary-settings'

// Send the setting option to the renderer process.
function settingSetup() {
  ipcMain.handle('setting:get-options', async () => {
    return settingsOption
  })

  ipcMain.handle('setting:get-setting-modal', async () => {
    return Settings
  })
}

export default settingSetup
