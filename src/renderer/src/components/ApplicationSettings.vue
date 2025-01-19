<template>
  <v-sheet class="pa-4">
    <v-form class="d-flex flex-column">
      <v-text class="mb-3">翻譯設定</v-text>
      <template v-for="option in settingsOptions">
        <v-select
          v-if="option.type === 'selection'"
          :label="option.name"
          :items="option.selections"
          :value-field="option.default ? option.default : null"
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
      settingsOptions: {}
    }
  },
  async mounted() {
    try {
      const response = await window.api.settings.settingOptions()
      this.settingsOptions = response
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }
}
</script>
<style></style>
