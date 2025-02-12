import { ipcMain } from 'electron'
import dictionarySelection from './universal-settings'
import CambridgeSetting from '../dictionarys/cambridge/cambridge-setting'
import { setDictionarySettings, setChoesenDictionary, setSystemSettings } from './store'

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
    ipcMain.handle('setting:set-options', async (_event, options: SettingOptions) => {
      try {
        console.log(options)
        setDictionarySettings(options.dictionaries)
        setChoesenDictionary(options.dictionaryNames)
        setSystemSettings(options.systemSettings)
        return true
      } catch (e) {
        console.error(e)
        return false
      }
    })
  }
}
