import { ipcMain } from 'electron'
import dictionarySelection from './universal-settings'
import CambridgeSetting from '../dictionarys/cambridge/cambridge-setting'

interface SettingOptions {
  dictionaryNames: typeof dictionarySelection
  systemSettings: object
  dictionaries: object
}
// Send the setting option to the renderer process.
export default class SettingManager {
  constructor() {
    this.setup()
  }
  public setup() {
    ipcMain.handle('setting:get-options', async () => {
      const settingsResponse: SettingOptions = {
        dictionaryNames: dictionarySelection,
        systemSettings: {},
        dictionaries: {
          cambridge: CambridgeSetting
        }
      }
      return settingsResponse
    })
  }
}
