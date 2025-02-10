import { ipcMain } from 'electron'
import dictionarySelection from './universal-settings'
import CambridgeSetting from '../dictionarys/cambridge/cambridge-setting'

// Send the setting option to the renderer process.
export default class SettingManager {
  constructor() {
    this.setup()
  }
  private setup() {
    ipcMain.handle('setting:get-options', async () => {
      let re: any = {
        dictionaryNames: dictionarySelection,
        systemSettings: {},
        dictionaries: {
          cambridge: CambridgeSetting
        }
      }
      return re
    })
  }
}
