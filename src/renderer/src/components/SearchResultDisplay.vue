<template>
  <div class="search-result-display">
    <p>單字卡</p>
    <v-btn @click="exportTest">輸出測試</v-btn>
    <v-btn @click="exportAudioTest">音訊輸出測試</v-btn>
    <v-card class="mx-auto info-card my-4" block v-if="searchResult" v-for="(item, index) in this.translation"
      :key="index">
      <template v-slot:title>
        <span class="font-weight-black">{{ item.volcabulary }}</span>
      </template>
      <v-card-text class="bg-surface-light pt-2">
        <v-row class="kk-pronounce my-2" no-gutters>
          <v-col cols="12" sm="6" class="d-flex flex-row align-center justify-start">
            <v-btn v-if="item.audioURL.uk" icon="mdi-volume-medium" size="x-small" @click="playAudio(item.audioURL.uk)">
              <v-icon>mdi-volume-medium</v-icon>
            </v-btn>
            <p v-if="item.kk.uk" class="text-caption">UK: {{ item.kk.uk }}</p>
            <v-btn v-if="item.audioURL.us" icon="mdi-volume-medium" size="x-small" @click="playAudio(item.audioURL.us)">
              <v-icon>mdi-volume-medium</v-icon>
            </v-btn>
            <p v-if="item.kk.us" class="text-caption">US: {{ item.kk.us }}</p>
            <p v-if="item.kk.dj" class="text-caption">DJ: {{ item.kk.dj }}</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-card class="mx-auto w-100 section-card ma-2" block v-if="item.sections"
            v-for="(section, index) in item.sections" :key="index">
            <v-card-text class="d-flex flex-column align-start">
              <v-chip v-if="section.type" class="py-1" label> {{ section.type }} </v-chip>
              <input v-if="section.translation" class="section-translation my-4" v-model="section.translation"></input>
              <v-chip v-if="section.definition" class="py-1" label>Definition</v-chip>
              <input v-if="section.definition" class="my-2" v-model="section.definition"></input>
              <v-spacer></v-spacer>
              <v-chip v-if="section.example" class="py-1" label>Example</v-chip>
              <div class="example-sentence pl-4 d-flex w-100" v-for="(sentence, index) in section.example" :key="index">
                <input v-if="sentence.sentence" v-model="sentence.sentence"></input>
                <input v-if="sentence.translation" v-model="sentence.translation"></input>
              </div>
            </v-card-text>
          </v-card>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapWritableState } from 'pinia'
import { mainStore } from '../store/main'
import emitter from '../mitt'
export default {
  name: 'SearchResultDisplay',
  data() {
    return {
      translation: null
    }
  },
  computed: {
    ...mapWritableState(mainStore, ['searchResult'])
  },
  methods: {
    playAudio(url) {
      const audio = new Audio(url); // 建立音檔物件
      audio.play(); // 播放音檔
    },
    exportTest() {
      try {
        let sendData = JSON.stringify(this.translation)
        window.api.export.exportCard(sendData).then((result) => {
          console.log('Export result:', result)  // 確認回傳結果
        })
      } catch (error) {
        console.error('Error exporting card:', error)
      }
    },
    exportAudioTest() {
      let sendData = JSON.stringify(this.translation)
      window.api.export.exportSound(sendData).then((result) => {
        console.log('Export result:', result)  // 確認回傳結果
      })
    }
  },
  created() {
    emitter.on('searchResult', async (data) => {
      this.translation = await data
    })
  }
}
</script>
<style scoped lang="scss">
.info-card {
  gap: 1rem;

  input {
    width: 100%;
    padding: 5px;
  }

  .section-card {
    width: 100%;

    .example-sentence {
      input {
        width: auto;
      }
    }
  }

  .kk-pronounce p {
    padding: 0 1rem;
  }
}

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