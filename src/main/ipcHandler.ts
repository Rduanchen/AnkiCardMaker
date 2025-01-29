import settingSetup from './settings/index'
import dictionarysSetup from './dictionarys/index'
import { ipcMain } from 'electron'
function setupAllIPC() {
  settingSetup()
  dictionarysSetup()
  ipcMain.handle('test', () => {
    console.log('test success')
    return {
      status: 'success'
    }
  })
}
export default setupAllIPC
