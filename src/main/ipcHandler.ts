import settingSetup from './settings/index'
import DictionaryFunctions from './dictionarys/index'
import { ipcMain } from 'electron'
function setupAllIPC() {
  settingSetup()
  new DictionaryFunctions()
  ipcMain.handle('test', () => {
    console.log('test success')
    return {
      status: 'success'
    }
  })
}
export default setupAllIPC
