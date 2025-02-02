<template>
  <v-sheet class="pa-4">
    <v-form class="d-flex flex-column">
      <v-text class="mb-3">翻譯設定</v-text>
      {{ settingsOptions }}
      <template v-for="option in settingsOptions">
        <v-select
          v-if="option.type === 'selection'"
          :label="option.name"
          :items="option.selections"
          v-model="onselectSettings[option.id]"
          :value-field="option.default ? option.selections[option.default] : null"
        ></v-select>
        <v-text-field
          v-if="option.type === 'text'"
          :label="option.name"
          v-model="onselectSettings[option.id]"
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
      settingsOptions: {},
      dictionariesSettings: {},
      onselectSettings: {}
    }
  },
  async mounted() {
    try {
      let response = await window.api.settings.settingOptions()
      this.dictionariesSettings = response.dictionaries
      delete response.dictionaries
      this.settingsOptions = response
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }
}
</script>
<style></style>
