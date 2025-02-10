<template>
<v-card class="mx-auto info-card my-4" block v-if="wordDictionary">
    <template v-slot:title>
    <span class="font-weight-black">{{ wordDictionary.word }}</span>
    </template>
    <v-card-text class="bg-surface-light pt-2">
        <v-row class="kk-pronounce my-2" no-gutters>  
          <template v-if="wordDictionary.kk" v-for="(item, index) in wordDictionary.kk">  
              <p class="text-caption">{{ item.type }}: {{ item.text }}</p>
          </template>
          <template v-if="wordDictionary.audioURL" v-for="(item, index) in wordDictionary.audioURL">
              {{ item.name }} 
              <v-btn class="mx-2 audio-play" icon @click="playAudio(item.url)">
                  <v-icon>mdi-volume-high</v-icon>
              </v-btn>
          </template>
        </v-row>
        <v-row no-gutters>
            <v-card class="mx-auto w-100 section-card ma-2" block v-if="wordDictionary.meanings"
            v-for="(section, index) in wordDictionary.meanings" :key="index">
                <v-card-text class="d-flex flex-column align-start">
                    <v-chip v-if="section.partOfSpeech" class="py-1" label> {{ section.partOfSpeech }} </v-chip>
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
</template>
<script>
export default {
  name: 'WordCard',
  props: {
    wordDictionary: {
      type: Object,
      required: true
    }
  },
  methods: {
    playAudio(url) {
      const audio = new Audio(url)
      audio.play()
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
