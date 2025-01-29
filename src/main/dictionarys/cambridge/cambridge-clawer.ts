import VocabularyClawerBase from '../modals/clawer-base'
import {
  KK,
  ExampleSentence,
  TypeTranslatePair,
  CardSection,
  CardSimple
} from '../modals/clawer-base'
require('axios')
require('cheerio')

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
  getDefination(): string[] {
    const defination = this.resultBody('.ddef_h')
    let result: any = []
    for (let i = 0; i < defination.length; i++) {
      const defs = defination.eq(i).find('.def.ddef_d.db')
      let str = ''
      for (let j = 0; j < defs.length; j++) {
        str += defs.eq(j).text()
      }
      result.push(str)
    }
    return result
  }
  getKK(): KK {
    let kks = this.resultBody.find('.pos-header.dpos-h').eq(0).find('.pron.dpron')
    let result: KK = {
      uk: kks.eq(0).text(),
      us: kks.eq(1).text(),
      dj: null
    }
    return result
  }
  getExampleSentences(): ExampleSentence[] {
    const examples = this.resultBody('.examp.dexamp')
    let result: ExampleSentence[] = []
    for (let i = 0; i < examples.length; i++) {
      let sentence: ExampleSentence = {
        sentence: examples.eq(i).find('.eg.deg').text(),
        translation: examples.eq(i).find('.trans.dtrans.dtrans-se.hdb.break-cj').text()
      }
      result.push(sentence)
    }
    return result
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
  getTranslationTypesPair(): TypeTranslatePair[] {
    const types = this.resultBody('.pr.entry-body__el')
    let result: TypeTranslatePair[] = []
    for (let i = 0; i < types.length; i++) {
      let type = types.eq(i).find('.posgram.dpos-g.hdib.lmr-5').text()
      let defs = types.eq(i).find('.def-body.ddef_b')
      let tempDef: string[] = []
      for (let j = 0; j < defs.length; j++) {
        let def = defs.eq(j).find('.trans.dtrans.dtrans-se.break-cj').eq(0).text()
        tempDef.push(def)
      }
      result.push({ type, translation: tempDef })
    }
    return result
  }
  getCardSection(): CardSection[] {
    const volType = this.resultBody('.pr.entry-body__el')
    let sections: CardSection[] = []
    for (let i = 0; i < volType.length; i++) {
      let type = volType.eq(i).find('.posgram.dpos-g.hdib.lmr-5').text()
      let sectionsBody = volType.eq(i).find('.def-block.ddef_block')
      for (let j = 0; j < sectionsBody.length; j++) {
        let sectionBody = sectionsBody.eq(j)
        let sectionData = {} as CardSection
        sectionData.type = type
        sectionData.translation = sectionBody.find('.trans.dtrans.dtrans-se.break-cj').text()
        sectionData.defination = sectionBody.find('.def.ddef_d.db').text()
        let examples = sectionBody.find('.examp.dexamp')
        let exampleList: ExampleSentence[] = []
        for (let k = 0; k < examples.length; k++) {
          let sentence = {} as ExampleSentence
          sentence.sentence = examples.eq(k).find('.eg.deg').text()
          sentence.translation = examples.eq(k).find('.trans.dtrans.dtrans-se.hdb.break-cj').text()
          exampleList.push(sentence)
        }
        sectionData.example = exampleList
        sections.push(sectionData)
      }
    }
    return sections
  }
  getCardSimple(): CardSimple {
    let cardSimple: CardSimple = {
      volcabulary: this.searchVol,
      kk: this.getKK(),
      audioURL: this.getVoiceUrl(),
      defination: this.getDefination(),
      example: this.getExampleSentences(),
      translation: this.getTraslation()
    }
    return cardSimple
  }
}
export default CambridgeClawer

if (require.main === module) {
  ;(async () => {
    console.log('Cambridge Clawer')

    let searchVol = 'hello'
    let cambridgeClawer = new CambridgeClawer(searchVol)

    // 等待初始化完成
    await cambridgeClawer.initialize()

    // 初始化完成後再執行其他方法
    // console.log(cambridgeClawer.getCardSimple());
    console.log(cambridgeClawer.getCardSection())
  })()
}
