import VocabularyClawerBase, { Meaning } from '../modals/clawer-base';
import { KK, ExampleSentence, Audio, WordDefination } from '../modals/clawer-base';
import { voiceDownloadModel } from '../../tools/to-mp3';

const cambridgeBaseUrl = `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/`;

export default class CambridgeClawer extends VocabularyClawerBase {
  constructor(searchVol: string, settings: object) {
    super(cambridgeBaseUrl, searchVol, settings);
  }
  protected makeUrl(word: string): string {
    return `${this.dictionaryUrl}${word}`;
  }
  getTraslation(): string[][] {
    const translations = this.resultBody('.trans.dtrans.dtrans-se.break-cj');
    const result: any[] = [];
    for (let i = 0; i < translations.length; i++) {
      const translate = translations.eq(i).find('.dtrans');
      const transList: any[] = [];
      for (let j = 0; j < translate.length; j++) {
        transList.push(translate.eq(j).text());
      }
      if (transList.length > 0) result.push(transList);
    }
    return result;
  }
  getDefinition(): string[] {
    const definition = this.resultBody('.ddef_h');
    const result: any = [];
    for (let i = 0; i < definition.length; i++) {
      const defs = definition.eq(i).find('.def.ddef_d.db');
      let str = '';
      for (let j = 0; j < defs.length; j++) {
        str += defs.eq(j).text();
      }
      result.push(str);
    }
    return result;
  }
  getKK(): KK[] {
    const kks = this.resultBody('.pos-header.dpos-h').eq(0).find('.pron.dpron');
    const result: KK[] = [
      {
        type: 'uk',
        text: kks.eq(0).text()
      },
      {
        type: 'us',
        text: kks.eq(1).text()
      }
    ];
    return result;
  }
  //FIXME: 無法取得連結
  getAudiosUrl(): Audio[] {
    const audioLinks: string[] = [];
    this.resultBody('audio source[type="audio/mpeg"]').each((_, element) => {
      const mp3Link = this.resultBody(element).attr('src');
      if (mp3Link) {
        audioLinks.push(`https://dictionary.cambridge.org${mp3Link}`);
      }
    });
    return [
      {
        name: 'uk',
        url: audioLinks[0]
      },
      {
        name: 'us',
        url: audioLinks[1]
      }
    ];
  }
  getExampleSentences(content): ExampleSentence[] {
    const examples = content.find('.examp.dexamp');
    const exampleList: ExampleSentence[] = [];
    for (let k = 0; k < examples.length; k++) {
      const sentence = {} as ExampleSentence;
      sentence.sentence = examples.eq(k).find('.eg.deg').text();
      sentence.translation = examples.eq(k).find('.trans.dtrans.dtrans-se.hdb.break-cj').text();
      exampleList.push(sentence);
    }
    return exampleList;
  }
  getTypes(): string[] {
    const types = this.resultBody('.posgram.dpos-g.hdib.lmr-5');
    const result: string[] = [];
    for (let i = 0; i < types.length; i++) {
      let exist = false;
      result.forEach((type) => {
        if (type == types.eq(i).text()) exist = true;
      });
      if (!exist) result.push(types.eq(i).text());
    }
    return result;
  }
  getEachMeaning(): Meaning[] {
    const volMeans = this.resultBody('.pr.entry-body__el');
    const sections: Meaning[] = [];
    for (let i = 0; i < volMeans.length; i++) {
      const partOfSpeech = volMeans.eq(i).find('.posgram.dpos-g.hdib.lmr-5').text();
      const sectionsBody = volMeans.eq(i).find('.def-block.ddef_block');
      for (let j = 0; j < sectionsBody.length; j++) {
        const sectionBody = sectionsBody.eq(j);
        const sectionData = {} as Meaning;
        sectionData.partOfSpeech = partOfSpeech;
        sectionData.translation = sectionBody.find('.trans.dtrans.dtrans-se.break-cj').eq(0).text();
        sectionData.definition = sectionBody.find('.def.ddef_d.db').text();
        sectionData.example = this.getExampleSentences(sectionBody);
        sections.push(sectionData);
      }
    }
    return sections;
  }
  getDictionary(): WordDefination {
    const cardBasic: WordDefination = {
      word: this.searchVol,
      kk: this.getKK(),
      audioURL: this.getAudiosUrl(),
      meanings: this.getEachMeaning()
    };
    return this.filterDictionaryObjectWithSettings(cardBasic);
  }
  filterDictionaryObjectWithSettings(cardBasic: WordDefination): WordDefination {
    const cardBasicFiltered: WordDefination = {
      word: cardBasic.word,
      kk: this.settings['displayKK'] == true ? cardBasic.kk : null,
      audioURL: this.settings['displayAudio'] == true ? cardBasic.audioURL : null,
      meanings: (() => {
        const displayAmount = countIteratorAmount(
          this.settings['cardNumber'],
          cardBasic.meanings.length
        );
        const meaningsFiltered: Meaning[] = [];
        for (let i = 0; i < displayAmount; i++) {
          const meaningFiltered: Meaning = {
            partOfSpeech: cardBasic.meanings[i].partOfSpeech,
            translation:
              this.settings['displayTranslation'] == true
                ? cardBasic.meanings[i].translation
                : null,
            definition:
              this.settings['displayDefinition'] == true ? cardBasic.meanings[i].definition : null,
            example:
              this.settings['displayExample'] == true
                ? (() => {
                    try {
                      const displayExampleAmount = countIteratorAmount(
                        this.settings['exampleLimit'],
                        cardBasic.meanings[i].example.length
                      );
                      const examplesFiltered: ExampleSentence[] = [];
                      for (let j = 0; j < displayExampleAmount; j++) {
                        const exampleFiltered: ExampleSentence = {
                          sentence: cardBasic.meanings[i].example[j].sentence,
                          translation:
                            this.settings['displayExampleTranslation'] == false
                              ? cardBasic.meanings[i].example[j].translation
                              : null
                        };
                        examplesFiltered.push(exampleFiltered);
                      }
                      return examplesFiltered;
                    } catch (e) {
                      console.error(e);
                      return cardBasic.meanings[i].example;
                    }
                  })()
                : null
          };
          meaningsFiltered.push(meaningFiltered);
        }
        return meaningsFiltered;
      })()
    };
    console.log('轉換完成');
    return cardBasicFiltered;
  }
}

function countIteratorAmount(settingAmount, originalAmount: number) {
  const totalDisplay = String(settingAmount);
  let displayAmount =
    totalDisplay == '' || (isNaN(Number(totalDisplay)) && totalDisplay.trim() == '')
      ? originalAmount
      : Number(totalDisplay);
  displayAmount = displayAmount > originalAmount ? originalAmount : displayAmount;
  return displayAmount;
}

export function generateVoiceDownloadModal(
  datas: WordDefination[],
  settings
): voiceDownloadModel[] {
  const downloadlist: voiceDownloadModel[] = [];
  // let faildownloadlist: string[] = []; //FIXME
  datas.forEach((item: WordDefination) => {
    if (settings['audioAccent'] == 'uk') {
      item.audioURL?.forEach((audio) => {
        if (audio.name == 'uk') {
          downloadlist.push({
            url: audio.url,
            fileName: item.word
          } as voiceDownloadModel);
        }
      });
    }
    if (settings['audioAccent'] == 'us') {
      item.audioURL?.forEach((audio) => {
        if (audio.name == 'us') {
          downloadlist.push({
            url: audio.url,
            fileName: item.word
          } as voiceDownloadModel);
        }
      });
    }
  });
  return downloadlist;
}
