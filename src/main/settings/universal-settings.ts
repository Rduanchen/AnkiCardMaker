import { SelectionInput } from './setting-modal';

const dictionarys = [
  {
    name: '劍橋字典',
    value: 'cambridge'
  }
];

const dictionarySelection = {
  name: '字典選擇',
  id: 'dictionaryChoice',
  type: 'selection',
  selections: dictionarys,
  default: 0
} as SelectionInput;

export default dictionarySelection;
