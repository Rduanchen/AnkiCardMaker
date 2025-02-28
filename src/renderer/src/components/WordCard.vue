<template>
<v-card v-if="wordDictionary" class="mx-auto info-card my-4" block>
    <template #title>
    <span class="font-weight-black">{{ wordDictionary.word }}</span>
    </template>
    <v-card-text class="bg-surface-light pt-2">
        <v-row class="kk-pronounce my-2" no-gutters>  
          <template v-for="(item, index) in wordDictionary.kk" v-if="wordDictionary.kk">  
              <p class="text-caption">{{ item.type }}: {{ item.text }}</p>
          </template>
          <template v-for="(item, index) in wordDictionary.audioURL" v-if="wordDictionary.audioURL">
              {{ item.name }} 
              <v-btn class="mx-2 audio-play" icon @click="playAudio(item.url)">
                  <v-icon>mdi-volume-high</v-icon>
              </v-btn>
          </template>
        </v-row>
        <v-row no-gutters>
            <v-card
v-for="(section, index) in wordDictionary.meanings" v-if="wordDictionary.meanings" :key="index"
            class="mx-auto w-100 section-card ma-2" block>
                <v-card-text class="d-flex flex-column align-start">
                    <v-chip v-if="section.partOfSpeech" class="py-1" label> {{ section.partOfSpeech }} </v-chip>
                    <input v-if="section.translation" v-model="section.translation" class="section-translation my-4" ></input>
                    <v-chip v-if="section.definition" class="py-1" label>Definition</v-chip>
                    <input v-if="section.definition" v-model="section.definition" class="my-2"></input>
                    <v-spacer></v-spacer>
                    <v-chip v-if="section.example" class="py-1" label>Example</v-chip>
                    <div v-for="(sentence, index) in section.example" :key="index" class="example-sentence pl-4 d-flex w-100">
                    <input v-if="sentence.sentence" v-model="sentence.sentence"></input>
                    <input v-if="sentence.translation" v-model="sentence.translation"></input>
                    </div>
                </v-card-text>
            </v-card>
        </v-row>
    </v-card-text>
</v-card>
</template>
<script>
export default {
  name: 'WordCard',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      wordDictionary: this.info
    }
  },
  watch: {
    info: {
      handler() {
        this.wordDictionary = this.info
      },
      deep: true
    }
  },
  methods: {
    playAudio(url) {
      const audio = new Audio(url)
      audio.play()
    },
    updateValue() {
      this.$emit('dataChange', this.wordDictionary)
    }
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
    height: 30px;
  }
}
</style>
