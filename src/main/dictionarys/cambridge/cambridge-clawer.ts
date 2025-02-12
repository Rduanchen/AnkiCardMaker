import VocabularyClawerBase, { Meaning } from '../modals/clawer-base'
import { KK, ExampleSentence, Audio, WordDefination } from '../modals/clawer-base'

let cambridgeBaseUrl = `https://dictionary.cambridge.org/dictionary/english-chinese-traditional/`

class CambridgeClawer extends VocabularyClawerBase {
  constructor(searchVol: string) {
    super(cambridgeBaseUrl, searchVol, {})
  }
  protected makeUrl(word: string): string {
    return `${this.dictionaryUrl}${word}`
  }
  getTraslation(): string[][] {
    const translations = this.resultBody('.trans.dtrans.dtrans-se.break-cj')
    let result: any[] = []
    for (let i = 0; i < translations.length; i++) {
      const translate = translations.eq(i).find('.dtrans')
      let transList: any[] = []
      for (let j = 0; j < translate.length; j++) {
        transList.push(translate.eq(j).text())
      }
      if (transList.length > 0) result.push(transList)
    }
    return result
  }
  getDefinition(): string[] {
    const definition = this.resultBody('.ddef_h')
    let result: any = []
    for (let i = 0; i < definition.length; i++) {
      const defs = definition.eq(i).find('.def.ddef_d.db')
      let str = ''
      for (let j = 0; j < defs.length; j++) {
        str += defs.eq(j).text()
      }
      result.push(str)
    }
    return result
  }
  getKK(): KK[] {
    let kks = this.resultBody('.pos-header.dpos-h').eq(0).find('.pron.dpron')
    let result: KK[] = [
      {
        type: 'uk',
        text: kks.eq(0).text()
      },
      {
        type: 'us',
        text: kks.eq(1).text()
      }
    ]
    return result
  }
  //FIXME: 無法取得連結
  getAudiosUrl(): Audio[] {
    const audioLinks: string[] = []
    this.resultBody('audio source[type="audio/mpeg"]').each((_, element) => {
      const mp3Link = this.resultBody(element).attr('src')
      if (mp3Link) {
        audioLinks.push(`https://dictionary.cambridge.org${mp3Link}`)
      }
    })
    return [
      {
        name: 'uk',
        url: audioLinks[0]
      },
      {
        name: 'us',
        url: audioLinks[1]
      }
    ]
  }
  getExampleSentences(content): ExampleSentence[] {
    let examples = content.find('.examp.dexamp')
    let exampleList: ExampleSentence[] = []
    for (let k = 0; k < examples.length; k++) {
      let sentence = {} as ExampleSentence
      sentence.sentence = examples.eq(k).find('.eg.deg').text()
      sentence.translation = examples.eq(k).find('.trans.dtrans.dtrans-se.hdb.break-cj').text()
      exampleList.push(sentence)
    }
    return exampleList
  }
  getTypes(): string[] {
    const types = this.resultBody('.posgram.dpos-g.hdib.lmr-5')
    let result: string[] = []
    for (let i = 0; i < types.length; i++) {
      let exist = false
      result.forEach((type) => {
        if (type === types.eq(i).text()) exist = true
      })
      if (!exist) result.push(types.eq(i).text())
    }
    return result
  }
  getEachMeaning(): Meaning[] {
    const volMeans = this.resultBody('.pr.entry-body__el')
    let sections: Meaning[] = []
    for (let i = 0; i < volMeans.length; i++) {
      let partOfSpeech = volMeans.eq(i).find('.posgram.dpos-g.hdib.lmr-5').text()
      let sectionsBody = volMeans.eq(i).find('.def-block.ddef_block')
      for (let j = 0; j < sectionsBody.length; j++) {
        let sectionBody = sectionsBody.eq(j)
        let sectionData = {} as Meaning
        sectionData.partOfSpeech = partOfSpeech
        sectionData.translation = sectionBody.find('.trans.dtrans.dtrans-se.break-cj').eq(0).text()
        sectionData.definition = sectionBody.find('.def.ddef_d.db').text()
        sectionData.example = this.getExampleSentences(sectionBody)
        sections.push(sectionData)
      }
    }
    return sections
  }
  getDictionary(): WordDefination {
    let cardBasic: WordDefination = {
      word: this.searchVol,
      kk: this.getKK(),
      audioURL: this.getAudiosUrl(),
      meanings: this.getEachMeaning()
    }
    return cardBasic
  }
}
export default CambridgeClawer

if (import.meta.url === new URL(import.meta.url).href) {
  ;(async () => {
    console.log('Cambridge Clawer')

    let searchVol = 'hello'
    let cambridgeClawer = new CambridgeClawer(searchVol)

    // 等待初始化完成
    await cambridgeClawer.initialize()

    // 初始化完成後再執行其他方法
    // console.log(cambridgeClawer.getCardSimple());
    console.log(cambridgeClawer.getDictionary())
  })()
}
