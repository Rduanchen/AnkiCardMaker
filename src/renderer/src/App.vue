<template>
  <v-app id="main">
    <v-app-bar>
      <v-app-bar-title>Rduan Anki Maker</v-app-bar-title>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <v-container class="pa-0 ma-0 app-content" fluid>
        <v-row no-gutters>
          <v-col cols="3">
            <SearchBar></SearchBar>
          </v-col>
          <v-col cols="9">
            <SearchResultDisplay></SearchResultDisplay>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" location="right">
      <ApplicationSettings></ApplicationSettings>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import ApplicationSettings from './components/ApplicationSettings.vue'
import SearchBar from './components/SearchBar.vue'
import SearchResultDisplay from './components/SearchResultDisplay.vue'
export default {
  components: {
    ApplicationSettings,
    SearchBar,
    SearchResultDisplay
  },
  data() {
    return {
      settingsOptions: {},
      drawer: null
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
<style lang="scss" scoped>
.app-content {
  height: 100% !important;
  width: 100% !important;
  border: solid 1px red;
  .v-row {
    height: 100% !important;
  }
  .v-col {
    height: 100% !important;
  }
}
</style>
