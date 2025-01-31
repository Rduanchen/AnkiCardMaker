import { dialog } from 'electron'
import * as fs from 'fs'

export async function saveTextToFile(text: string): Promise<void> {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Save Text File',
    defaultPath: 'document.txt',
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  })

  if (filePath) {
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        console.error('An error occurred while saving the file:', err)
      } else {
        console.log('File saved successfully:', filePath)
      }
    })
  }
}
