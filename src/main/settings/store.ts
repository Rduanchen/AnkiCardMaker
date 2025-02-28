import Store from 'electron-store';
const store: any = new Store(); // 擺爛中

function setDictionarySettings(data: any) {
  if (data === undefined) {
    store.delete('settings:dictionarySettings');
  } else {
    store.set('settings:dictionarySettings', data);
  }
}

function getDictionarySettings(): object {
  return store.get('settings:dictionarySettings', {});
}

function setChosenDictionary(data: any) {
  if (data === undefined) {
    store.delete('settings:chosenDictionary');
  } else {
    store.set('settings:chosenDictionary', data);
  }
}

function getChosenDictionary(): string {
  return store.get('settings:chosenDictionary', '');
}

function setSystemSettings(data: any) {
  if (data === undefined) {
    store.delete('settings:systemSettings');
  } else {
    store.set('settings:systemSettings', data);
  }
}

function getSystemSettings(): object {
  return store.get('settings:systemSettings', {});
}

export {
  setDictionarySettings,
  getDictionarySettings,
  setChosenDictionary,
  getChosenDictionary,
  setSystemSettings,
  getSystemSettings
};
