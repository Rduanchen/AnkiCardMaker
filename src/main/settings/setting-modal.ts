export interface Settings {
  source: {
    translation: string
    definition: string
    example: string
    kk: string
  }
  media: {
    download: boolean
    isNeed: boolean
  }
  limit: {
    translation: number | null
    definition: number | null
    example: number | null
  }
}
