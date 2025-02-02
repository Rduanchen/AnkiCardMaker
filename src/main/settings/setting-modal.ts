export interface Settings {
  translation: string
  definition: string
  example: string
  kk: string
  download: boolean
  isNeed: boolean
  translationLimit: number | never
  definitionLimit: number | never
  exampleLimit: number | never
}

interface SettingsInput {
  name: string
  id: string
  type: string
  default: any | never
}

export interface NumberInput extends SettingsInput {
  type: 'text'
  placeholder: string
}

export interface SelectionInput extends SettingsInput {
  type: 'selection'
  selections: string[]
  default: number
}

export interface SectionTitle {
  name: string
}
