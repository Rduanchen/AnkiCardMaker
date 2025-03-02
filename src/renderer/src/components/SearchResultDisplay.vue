<template>
  <div class="search-result-display">
    <p>單字卡</p>
    <v-btn @click="exportCardtoAnki">輸出</v-btn>
    <v-btn @click="exportAudioTest">音訊輸出測試</v-btn>
    <template v-for="(item, index) in dictionaries" :key="index">
      <WordCard
        :info="item"
        @dataChange="
          (value) => {
            updateTraslationData(index, value);
          }
        "
      />
    </template>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { mainStore } from '../store/main';
import WordCard from './WordCard.vue';
import emitter from '../mitt';
export default {
  name: 'SearchResultDisplay',
  components: {
    WordCard
  },
  data() {
    return {
      dictionaries: null,
      modifiedData: undefined
    };
  },
  computed: {
    ...mapWritableState(mainStore, ['searchResult'])
  },
  created() {
    emitter.on('searchResult', async (data) => {
      this.dictionaries = await data;
      this.modifiedData = this.dictionaries;
    });
  },
  methods: {
    updateTraslationData(index, value) {
      this.modifiedData[index] = value;
    },
    exportCardtoAnki() {
      try {
        const sendData = JSON.stringify(this.dictionaries);
        window.api.export.exportCard(sendData).then((result) => {
          console.log('Export result:', result); // 確認回傳結果
        });
      } catch (error) {
        console.error('Error exporting card:', error);
      }
    },
    exportAudioTest() {
      const sendData = JSON.stringify(this.dictionaries);
      window.api.export.exportSound(sendData).then((result) => {
        console.log('Export result:', result); // 確認回傳結果
      });
    }
  }
};
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
