<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>Application</v-app-bar-title>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main>
      <!--  -->
    </v-main>
    <v-navigation-drawer v-model="drawer" location="right"></v-navigation-drawer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<script>
export default {
  data: () => ({ drawer: null })
}
</script>
