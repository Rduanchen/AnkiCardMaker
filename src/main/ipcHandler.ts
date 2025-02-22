import SettingManager from './settings/index'
import DictionaryFunctions from './dictionarys/index'
import MakeAnkiCard from './export'
import { ipcMain } from 'electron'
function setupAllIPC() {
  new SettingManager().setup()
  new DictionaryFunctions()
  new MakeAnkiCard()
  ipcMain.handle('test', () => {
    console.log('test success')
    return {
      status: 'success'
    }
  })
}
export default setupAllIPC
