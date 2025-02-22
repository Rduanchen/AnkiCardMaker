import Store from 'electron-store';
const store = new Store();

function setDictionarySettings(data: any) {
  store.set('settings:dictionarySettings', data);
}

function setChoesenDictionary(data: any) {
  store.set('settings:choesenDictionary', data);
}

function setSystemSettings(data: any) {
  store.set('settings:systemSettings', data);
}

export { setDictionarySettings, setChoesenDictionary, setSystemSettings };
