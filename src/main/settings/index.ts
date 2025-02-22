import { ipcMain } from 'electron'
import dictionarySelection from './universal-settings'
import CambridgeSetting from '../dictionarys/cambridge/cambridge-setting'
import { setDictionarySettings, setChoesenDictionary, setSystemSettings } from './store'

// Send the setting option to the renderer process.
export default class SettingManager {
  constructor() {}
  public setup() {
    ipcMain.handle('setting:get-options', async () => {
      const settingsResponse = {
        dictionaryNames: dictionarySelection,
        systemSettings: {},
        dictionaries: {
          cambridge: CambridgeSetting
        }
      }
      return settingsResponse
    })
    ipcMain.handle('setting:set-options', async (_event, options: any) => {
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
