let options = [
  {
    name: '中文翻譯',
    type: 'selection',
    default: 0,
    selections: ['Yahoo', 'Cambridge']
  },
  {
    name: '英文定義優先來源',
    type: 'selection',
    default: 0,
    selections: ['Cambridge']
  },
  {
    name: '造句優先來源',
    type: 'selection',
    default: 0,
    selections: ['Yahoo']
  },
  {
    name: 'KK音標來源',
    type: 'selection',
    default: 0,
    selections: ['Yahoo', 'Cambridge']
  },
  {
    name: '是否需要音檔',
    type: 'selection',
    selections: ['是', '否']
  },
  {
    name: '音檔下載',
    type: 'selection',
    default: 1,
    selections: ['是', '否']
  },
  {
    name: '句子數量限制',
    type: 'text',
    default: 3,
    placeholder: '自動'
  },
  {
    name: '定義數量限制',
    type: 'text',
    default: 10,
    placeholder: '自動'
  }
]

export default options
