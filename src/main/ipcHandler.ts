import settingSetup from './settings/index'
import DictionaryFunctions from './dictionarys/index'
import MakeAnkiCard from './make-anki-card'
import { ipcMain } from 'electron'
function setupAllIPC() {
  settingSetup()
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
