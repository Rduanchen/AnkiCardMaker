const { ipcMain } = require('electron')
import { CambridgeAutoComplete } from './cambridge/cambridge-auto-complete'

let cambridgeAutoComplete = new CambridgeAutoComplete()
export default function dictionarysSetup() {
  ipcMain.handle('dictionary:auto-complete', async (_event, word: string) => {
    let result = await cambridgeAutoComplete.getAutoComplete(word)
    console.log(word)
    console.log(result)
    return result
  })
}
