import { SelectionInput } from './setting-modal'

let dictionarys = ['Cambridge']

let universalSettings = [
  {
    name: '字典選擇',
    id: 'dictionaryChoice',
    type: 'selection',
    selections: dictionarys,
    default: 0
  } as SelectionInput
]

export default universalSettings
