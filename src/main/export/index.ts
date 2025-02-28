import { ipcMain } from 'electron';
import { exportCard } from './process-data';
import { saveTextToFile, selectFolder } from '../tools/save-file';
import { downloadMp3Files } from '../tools/to-mp3';
import { voiceDownloadModel } from '../tools/to-mp3';
import { generateVoiceDownloadModal } from '../dictionarys/cambridge/cambridge-clawer';
import { getChosenDictionary, getDictionarySettings } from '../settings/store';

export default class MakeAnkiCard {
  constructor() {
    this.setup();
  }
  private setup() {
    ipcMain.handle('card:export-data', async (_event, data) => {
      return this.exportData(data);
    });
    ipcMain.handle('card:export-sound', async (_event, data) => {
      return this.exportSound(data);
    });
  }
  private exportData(data: any) {
    saveTextToFile(exportCard(data));
    return ['success'];
  }
  private async exportSound(data: string) {
    const datas = JSON.parse(data);
    let downloadlist: voiceDownloadModel[] = [];
    const dictionaryName = getChosenDictionary();
    if (dictionaryName == 'cambridge') {
      downloadlist = generateVoiceDownloadModal(datas, getDictionarySettings());
    }
    console.log(downloadlist);
    const filePath = await selectFolder();
    if (filePath) {
      downloadMp3Files(downloadlist, filePath);
    } else {
      console.error('No folder selected');
      return ['error'];
    }
    console.log('exportSound');
    return ['success'];
  }
}
