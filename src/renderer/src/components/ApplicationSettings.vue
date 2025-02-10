<template>
  <v-sheet class="pa-4">
    <v-form class="d-flex flex-column">
      <p class="mb-3">翻譯設定</p>
      <v-select
        :label="dictionariesNames.name"
        :items="dictionariesNames.selections"
        v-model="onselectDictionary"
      ></v-select>
      <template v-for="option in dictionarySettings[onselectDictionary]">
        <v-select
          v-if="option.type === 'selection'"
          :label="option.name"
          :items="option.selections"
          :value-field="option.default ? option.selections[option.default] : null"
        ></v-select>
        <v-text-field
          v-if="option.type === 'text'"
          :label="option.name"
          :placeholder="option.placeholder ? option.placeholder : null"
        ></v-text-field>
      </template>
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  data() {
    return {
      dictionariesNames: {},
      systemSettings: {},
      dictionarySettings: {},
      onselectDictionary: ''
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
  }
}
</script>
<style></style>
