import { ipcMain } from 'electron'
import { exportCard } from './process-data'
import { saveTextToFile } from './save-file'
export default class MakeAnkiCard {
  constructor() {
    this.setup()
  }
  private setup() {
    ipcMain.handle('card:export-data', async (_event, data) => {
      return this.exportData(data)
    })
  }
  private exportData(data: any) {
    console.log('exportData')
    saveTextToFile(exportCard(data))
    return ['success']
  }
}
