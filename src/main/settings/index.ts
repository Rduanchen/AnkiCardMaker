import { ipcMain } from 'electron';
import dictionarySelection from './universal-settings';
import CambridgeSetting from '../dictionarys/cambridge/cambridge-setting';
import { setDictionarySettings, setChosenDictionary, setSystemSettings } from './store.js';

// Send the setting option to the renderer process.
export default class SettingManager {
  constructor() {}
  public IPCSetup() {
    ipcMain.handle('setting:get-options', async () => {
      const settingsResponse = {
        dictionaryNames: dictionarySelection,
        systemSettings: {},
        dictionaries: {
          cambridge: CambridgeSetting
        }
      };
      return settingsResponse;
    });
    ipcMain.handle('setting:set-options', async (_event, options: any) => {
      try {
        if (options.dictionarySetting != undefined)
          setDictionarySettings(options.dictionarySetting);
        if (options.dictionaryName != undefined) setChosenDictionary(options.dictionaryName);
        if (options.systemSettings != undefined) setSystemSettings(options.systemSettings);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
}
