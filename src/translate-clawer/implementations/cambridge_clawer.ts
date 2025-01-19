import VocabularyClawerBase from '../base/clawer_base'
import { kk, ExampleSentence, TypeTranslatePair } from './base/clawer_base'
import axios from 'axios'
import * as cheerio from 'cheerio'

let cambridgeBaseUrl = `https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/`

class CambridgeClawer extends VocabularyClawerBase {
  constructor(searchVol: string) {
    super(cambridgeBaseUrl, searchVol)
  }
  protected makeUrl(word: string): string {
    return `${this.dictionaryUrl}${word}`
  }
  getTraslation(limit: number): string[][] {
    const translations = this.resultBody('.trans.dtrans.dtrans-se.break-cj')
    let result = []
    for (let i = 0; i < translations.length; i++) {
      const translate = translations.eq(i).find('.dtrans')
      let transList = []
      for (let j = 0; j < translate.length; j++) {
        transList.push(translate.eq(j).text())
      }
      if (transList.length > 0) result.push(transList)
    }
    return result
  }
  getDefination(limit: number): string[] {
    const defination = this.resultBody('.ddef_h')
    let result = []
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
  getKK(): kk {
    let kks = this.resultBody('.pos-header.dpos-h').eq(0).find('.pron.dpron')
    let result: kk = {
      uk: kks.eq(0).text(),
      us: kks.eq(1).text()
    }
    return result
  }
  getExampleSentences(limit: number): ExampleSentence[] {
    const examples = this.resultBody('.examp.dexamp')
    let result = []
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
    let result = []
    for (let i = 0; i < types.length; i++) {
      let exist = false
      result.forEach((type) => {
        if (type === types.eq(i).text()) exist = true
      })
      if (!exist) result.push(types.eq(i).text())
    }
    return result
  }
  getTranslationTypesPair(limit: number): TypeTranslatePair[] {
    const types = this.resultBody('.pr.entry-body__el')
    let result: TypeTranslatePair[] = []
    for (let i = 0; i < types.length; i++) {
      let type = types.eq(i).find('.posgram.dpos-g.hdib.lmr-5').text()
      let defs = types.eq(i).find('.def-body.ddef_b')
      let tempDef = []
      for (let j = 0; j < defs.length; j++) {
        let def = defs.eq(j).find('.trans.dtrans.dtrans-se.break-cj').eq(0).text()
        tempDef.push(def)
      }
      result.push({ type, translation: tempDef })
    }
    return result
  }
}
export default CambridgeClawer
module.exports = CambridgeClawer
