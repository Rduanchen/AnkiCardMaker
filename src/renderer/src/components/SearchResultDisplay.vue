<template>
  <div class="search-result-display">
    <p>單字卡</p>
    <v-btn @click="exportTest">輸出測試</v-btn>
    <v-btn @click="exportAudioTest">音訊輸出測試</v-btn>
    <template v-for="(item, index) in dictionaries" :key="index">
      <WordCard :wordDictionary="item" />
    </template>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { mainStore } from '../store/main'
import WordCard from './WordCard.vue'
import emitter from '../mitt'
export default {
  name: 'SearchResultDisplay',
  data() {
    return {
      dictionaries: null
    }
  },
  components: {
    WordCard
  },
  computed: {
    ...mapWritableState(mainStore, ['searchResult'])
  },
  methods: {
    exportTest() {
      try {
        let sendData = JSON.stringify(this.dictionaries)
        window.api.export.exportCard(sendData).then((result) => {
          console.log('Export result:', result) // 確認回傳結果
        })
      } catch (error) {
        console.error('Error exporting card:', error)
      }
    },
    exportAudioTest() {
      let sendData = JSON.stringify(this.dictionaries)
      window.api.export.exportSound(sendData).then((result) => {
        console.log('Export result:', result) // 確認回傳結果
      })
    }
  },
  created() {
    emitter.on('searchResult', async (data) => {
      this.dictionaries = await data
    })
  }
}
</script>
<style scoped lang="scss">
.search-result-display {
  max-height: 90vh;
  padding: 20px;
  overflow-y: auto;
}

p {
  color: white;
  font-size: 20px;
}
</style>
