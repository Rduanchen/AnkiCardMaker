import settingSetup from './settings/index'
import { ipcMain } from 'electron'
function setupAllIPC() {
  settingSetup()
  ipcMain.handle('test', () => {
    console.log('test success')
    return {
      status: 'success'
    }
  })
}
export default setupAllIPC
