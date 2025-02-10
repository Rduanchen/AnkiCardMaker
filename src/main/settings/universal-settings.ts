import { SelectionInput } from './setting-modal'

let dictionarys = ['cambridge']

let dictionarySelection = {
  name: '字典選擇',
  id: 'dictionaryChoice',
  type: 'selection',
  selections: dictionarys,
  default: 0
} as SelectionInput

export default dictionarySelection
