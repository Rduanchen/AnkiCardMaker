import VocabularyClawerBase from '../base/clawer_base'
import { kk, ExampleSentence, TypeTranslatePair } from './base/clawer_base'
import axios from 'axios'
import * as cheerio from 'cheerio'

let yahooBaseUrl = `https://tw.dictionary.yahoo.com/dictionary?p=`

class YahooClawer extends VocabularyClawerBase {
  constructor(searchVol: string) {
    super(yahooBaseUrl, searchVol)
  }
  protected makeUrl(word: string): string {
    return `${this.dictionaryUrl}${word}`
  }
  getTraslation(limit: number): string[][] {
    const translations = this.resultBody('.dictionaryExplanation')
    let result = []
    for (let i = 0; i < translations.length; i++) {
      const translate = translations.eq(i).text()
      result.push(translate.split('；'))
    }
    return result
  }
  getDefination(limit: number): string[] {
    return ['']
  }
  getKK(): kk {
    let kks = this.resultBody('.dictionaryWordCard')
    kks = kks.find('.compList').eq(0).find('.fz-14')
    let result: kk = {
      KK: kks.eq(0).text(),
      DJ: kks.eq(1).text()
    }
    return result
  }
  getExampleSentences(limit: number): ExampleSentence[] {
    let sentences = this.resultBody('.d-b.fz-14.fc-2nd.lh-20')
    let result = []
    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences.eq(i).text()
      let chinese_part = sentence.match(/[\u4e00-\u9fff]+/g)?.join('') || ''
      let english_part = sentence.match(/[a-zA-Z0-9\s.,]+/g)?.join('') || ''
      result.push({ sentence: english_part, translation: chinese_part })
    }
    return result
  }
  getTranslationTypesPair(limit: number): TypeTranslatePair[] {
    let types = this.resultBody('.compList.mb-25.p-rel')
    types = types.find('.lh-22.mh-22.mt-12.mb-12.mr-25')
    let result = []
    for (let i = 0; i < types.length; i++) {
      let type = types.eq(i).find('.pos_button').text()
      let translation = types.eq(i).find('.dictionaryExplanation').text()
      result.push({ type: type, translation: translation.split('；') })
    }
    return result
  }
  getTypes(): string[] {
    let types = this.resultBody('.compList.mb-25.p-rel')
    types = types.find('.lh-22.mh-22.mt-12.mb-12.mr-25')
    let result = []
    for (let i = 0; i < types.length; i++) {
      let type = types.eq(i).find('.pos_button').text()
      result.push(type)
    }
    return result
  }
  getVoiceUrl(): string {
    return `https://s.yimg.com/bg/dict/dreye/live/m/${this.searchVol}.mp3`
  }
}

export default YahooClawer
