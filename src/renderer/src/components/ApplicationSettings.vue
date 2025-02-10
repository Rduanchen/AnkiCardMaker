<template>
  <v-sheet class="pa-4">
    <v-form class="d-flex flex-column">
      <p class="mb-3">翻譯設定</p>
      {{ translateSettings }}
      <v-select
        :label="dictionariesNames.name"
        :items="dictionariesNames.selections"
        v-model="dictionaryChange"
        @click="changeDictionary"
      ></v-select>
      <template v-for="option in dictionarySettings[onselectDictionary]">
        <v-select
          v-if="option.type === 'selection'"
          :label="option.name"
          :items="option.selections"
          v-model="translateSettings.dictionarySetting[option.id]"
          :value-field="option.default ? option.selections[option.default] : null"
        ></v-select>
        <v-text-field
          v-if="option.type === 'text'"
          :label="option.name"
          v-model="translateSettings.dictionarySetting[option.id]"
          :placeholder="option.placeholder ? option.placeholder : null"
        ></v-text-field>
      </template>
    </v-form>
  </v-sheet>
</template>
<script>
import { mainStore } from '../store/main'
import { mapWritableState } from 'pinia'

export default {
  data() {
    return {
      dictionariesNames: {},
      systemSettings: {},
      dictionarySettings: {},
      onselectDictionary: ''
    }
  },
  computed: {
    ...mapWritableState(mainStore, ['translateSettings']),
    dictionaryChange: {
      get() {
        return this.onselectDictionary
      },
      set(value) {
        this.onselectDictionary = value
        this.translateSettings.dictionaryName = value
      }
    }
  },
  async mounted() {
    try {
      let response = await window.api.settings.settingOptions()
      this.dictionariesNames = response.dictionaryNames
      this.systemSettings = response.systemSettings //FIXME: 尚未實踐
      this.dictionarySettings = response.dictionaries
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  },
  methods: {
    changeDictionary() {
      this.translateSettings.systemSettings = {}
      this.translateSettings.dictionarySetting = {}
    }
  }
}
</script>
<style></style>
