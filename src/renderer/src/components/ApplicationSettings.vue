<template>
  <v-sheet class="pa-4">
    <v-form class="d-flex flex-column">
      <p class="mb-3">翻譯設定</p>
      <v-select
        v-model="dictionaryChange"
        :label="dictionariesNames.name"
        :items="dictionariesNames.selections"
        item-title="name"
        item-value="value"
        @click="changeDictionary"
      ></v-select>
      <template v-for="option in dictionarySettings[onselectDictionary]">
        <v-select
          v-if="option.type === 'selection'"
          v-model="translateSettings.dictionarySetting[option.id]"
          :label="option.name"
          :items="option.selections"
          item-title="name"
          item-value="value"
          @update:modelValue="setSettings"
        ></v-select>
        <v-text-field
          v-if="option.type === 'text'"
          v-model="translateSettings.dictionarySetting[option.id]"
          :label="option.name"
          @update:modelValue="setSettings"
        ></v-text-field>
      </template>
    </v-form>
  </v-sheet>
</template>
<script>
import { mainStore } from '../store/main';
import { mapWritableState } from 'pinia';

export default {
  data() {
    return {
      dictionariesNames: {},
      systemSettings: {},
      dictionarySettings: {},
      onselectDictionary: ''
    };
  },
  computed: {
    ...mapWritableState(mainStore, ['translateSettings']),
    dictionaryChange: {
      get() {
        return this.onselectDictionary;
      },
      set(value) {
        this.onselectDictionary = value;
        this.translateSettings.dictionaryName = value;
        this.setSettingDefaultValues();
      }
    }
  },
  async mounted() {
    try {
      const response = await window.api.settings.settingOptions();
      this.dictionariesNames = response.dictionaryNames;
      this.systemSettings = response.systemSettings; //FIXME: 尚未實踐
      this.dictionarySettings = response.dictionaries;
      this.setDictionaryDefaultName();
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  },
  methods: {
    setDictionaryDefaultName() {
      try {
        this.translateSettings.dictionaryName =
          this.dictionariesNames.selections[this.dictionariesNames.default].value;
      } catch (error) {
        console.warn('No default dictionary name:', error);
        this.translateSettings.dictionaryName = this.dictionariesNames.selections[0];
      }
      this.onselectDictionary = this.translateSettings.dictionaryName.value;
      this.changeDictionary();
    },
    setSettingDefaultValues() {
      const dictionarySetting = this.dictionarySettings[this.onselectDictionary];
      for (const index in dictionarySetting) {
        if (
          dictionarySetting[index].type == 'selection' &&
          dictionarySetting[index].selections != undefined &&
          dictionarySetting[index].default != undefined
        ) {
          this.translateSettings.dictionarySetting[dictionarySetting[index].id] =
            dictionarySetting[index].selections[dictionarySetting[index].default].value;
        } else if (
          dictionarySetting[index].type == 'text' &&
          dictionarySetting[index].default != undefined
        ) {
          console.log('default:', dictionarySetting[index].default);
          this.translateSettings.dictionarySetting[dictionarySetting[index].id] =
            dictionarySetting[index].default;
        }
      }
      for (const systemSetting in this.systemSettings) {
        if (systemSetting.id && systemSetting.default)
          this.translateSettings.systemSettings[systemSetting.id] = systemSetting.default;
      }
      for (const dictionaryName in this.dictionariesNames) {
        if (dictionaryName.default) this.translateSettings.dictionaryName = dictionaryName;
      }
    },
    changeDictionary() {
      this.translateSettings.systemSettings = {};
      this.translateSettings.dictionarySetting = {};
      this.setSettingDefaultValues();
      this.setSettings();
    },
    setSettings() {
      const settingsData = JSON.parse(JSON.stringify(this.translateSettings));
      window.api.settings.setSettings(settingsData).then((result) => {
        if (result) {
          console.log('Settings saved:', result);
        }
      });
    }
  }
};
</script>
<style></style>
