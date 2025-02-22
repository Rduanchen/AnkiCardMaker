import axios from 'axios';
import * as cheerio from 'cheerio';

function emitError(message: any): never {
  throw new Error(message);
}

export interface TypeTranslatePair {
  type: string;
  translation: string[];
}

export interface ExampleSentence {
  sentence: string;
  translation: string;
}

export interface kk {}

export default abstract class VocabularyClawerBase {
  searchVol: string;
  dictionaryUrl: string;
  protected resultBody: any = null;

  protected requestheader = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9',
    Referer: 'https://www.google.com/',
    Connection: 'keep-alive',
  };

  constructor(dictionaryUrl: string, searchVol: string) {
    this.searchVol = searchVol;
    this.dictionaryUrl = dictionaryUrl;
  }
  protected abstract makeUrl(word: string): string;
  /**
   * Initialize the class by fetching the html body of the dictionary website
   * @returns The url of the search word in the dictionary website
   */
  async initialize(): Promise<void> {
    await this.getHtmlBody();
  }
  private async getHtmlBody(): Promise<void> {
    try {
      const url = this.makeUrl(this.searchVol);
      const response = await axios.get(url, {
        headers: this.requestheader,
      });
      this.resultBody = cheerio.load(response.data);
    } catch (error) {
      emitError(error);
    }
  }
  bodyOverride(content: string): void {
    this.resultBody = cheerio.load(content);
  }
  abstract getTraslation(limit: number): string[][] | string[];
  abstract getDefination(limit: number): string[];
  abstract getExampleSentences(limit: number): ExampleSentence[];
  abstract getTranslationTypesPair(limit: number): TypeTranslatePair[];
  abstract getTypes(): string[];
  getKK(): kk {
    emitError('Not implemented');
  }
  getVoice(): string {
    emitError('Not implemented');
  }
  getBody(): any {
    return this.resultBody;
  }
}
