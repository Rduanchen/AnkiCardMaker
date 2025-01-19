<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <!--  -->
      <p style="color: 'white'">{{ settingsOptions }}</p>
    </v-main>
    <v-navigation-drawer v-model="drawer" location="right">
      <ApplicationSettings></ApplicationSettings>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import ApplicationSettings from './components/ApplicationSettings.vue'
export default {
  components: {
    ApplicationSettings
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
