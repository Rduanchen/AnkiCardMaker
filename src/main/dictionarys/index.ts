// const { ipcMain } = require('electron')
import { ipcMain } from 'electron'
import { CambridgeAutoComplete } from './cambridge/cambridge-auto-complete'
import CambridgeClawer from './cambridge/cambridge-clawer'
import pLimit from 'p-limit'

const limit = pLimit(5)

export default class DictionaryFunctions {
  private cambridgeAutoComplete = new CambridgeAutoComplete()
  constructor() {
    this.setup()
  }
  private setup() {
    console.log('DictionaryFunctions is ready')
    ipcMain.handle('dictionary:auto-complete', async (_event, word: string) => {
      console.log('get auto complete')
      let res = await this.autoComplete(word)
      console.log('res', res)
      return res
    })
    ipcMain.handle('dictionary:search', async (_event, words: string[]) => {
      const res = await this.dictionarySearch(words)
      return res
    })
  }
  private autoComplete(word: string) {
    return this.cambridgeAutoComplete.getAutoComplete(word)
  }
  private async dictionarySearch(words: string[]) {
    let allRequests = words.map((word) => {
      return limit(async () => {
        let clawer = new CambridgeClawer(word)
        await clawer.initialize()
        return clawer.getDictionary()
      })
    })
    return await Promise.all(allRequests)
  }
}
